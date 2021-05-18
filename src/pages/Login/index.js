import React, { useState, useEffect } from 'react';
import { CardHeader, ChatCard, ChatContent, ChatInput, ChatMenssageContainer, ChatMessage, ChatSendMenssageContainer, Content, MainContainer, Send, ChatSendMessage, ChatUser, ChatScroll, Overlay, InputContent, UserProfile, ProfilePic, ProfileName, Logout, Error, RetryButton } from './styles'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import api from '../../services/api';
import UserAvatar from '../../imgs/userAvatar.png';
import BotAvatar from '../../imgs/botAvatar.png';

export default function Login() {
    const [logged, setLogged] = useState(false);
    const [message, setMessage] = useState();
    const [input, setInput] = useState({
        type: 'text',
        placeholder: 'Sua mensagem...'
    });
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        pass: ""
    });
    const [error, setError] = useState();
    const [tempChat, setTempChat] = useState();
    const [chatLoader, setChatLoader] = useState();
    const [chat, setChat] = useState([]);

    function EchoMessages(msg){

        setChatLoader(true);
        var rd = msg.length;
        msg.map((item, index) => {
            setTimeout(() => {
                if (index + 1 === rd) {
                    setChatLoader(false)
                }
                setInput({
                    type: item.inputType,
                    placeholder: item.inputPlaceholder
                })
                setTempChat(
                    {
                        uid: 1,
                        isLoading: false,
                        message: item.message
                    }
                );
            }, 1500 * index)
        })

    }

    async function SendMessage(e) {
    e.preventDefault();

        const Password = [
            {
                uid: 1,
                inputType: 'password',
                inputPlaceholder: 'Sua mensagem...',
                message: 'Ok!'
            },
            {
                uid: 1,
                inputType: 'password',
                inputPlaceholder: 'Sua Senha...',
                message: 'Agora me envie sua SENHA!'
            }
        ];

        if (!formData.user) {
            if (input.type === 'text' && message) {
                setFormData({
                    user: message,
                    email: formData.email,
                    pass: formData.pass,
                })

                EchoMessages(Password)
            }
            if (input.type === 'email' && message) {

                setFormData({
                    user: formData.user,
                    email: message,
                    pass: formData.pass,
                })
                EchoMessages(Password)
            }
        }

        if (formData.user || formData.email) {
            if (input.type === 'password' && message) {
                setFormData({
                    user: formData.user,
                    email: formData.email,
                    pass: message,
                })
            }
        }

        if (!message) {
            return
        }
        var tempMsg = message;
        var encryptMessage = tempMsg.replace(/./g, '*');
        const NewMessage = {
            uid: 0,
            message: input.type === 'password' ? encryptMessage : message
        }
        const NewArray = [...chat, NewMessage]
        setChat(NewArray)
        setMessage(null);

    }

    useEffect(() => {
        async function Login(){
            if (!chatLoader) {
                setChatLoader(true)
            }
            if ((formData.user || formData.email) && formData.pass) {
    
                const config = {
                    headers: {
                        'con-type': 'auth'
                    }   
                }
                const data = {
                    user: formData.user,
                    email: formData.email,
                    pass: formData.pass
                }
                console.log(data);
                await api.post('login', data, config).then(function(res){ ;
                if (res) {
                    setChatLoader(false);
                    if (res.data.logged) {
                        setLogged(true);
                        localStorage.setItem('@CHATLOGIN/isLogged', true)
                    }else{
                        setFormData({
                            user: "",
                            email: "",
                            pass: ""
                        });
                        console.log(res);
                        EchoMessages(res.data)
                    }
                }
            }).catch(function(err){
                setError(`${err}`)
            })

            }
        }
        Login();
    }, [formData])

    useEffect(() => {
        if (tempChat) {
            const NC = [...chat, tempChat]
            setChat(NC);
        }
    }, [tempChat])

    useEffect(() => {

        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [chat, chatLoader]);

    async function Con() {
        setError(null)
        setChatLoader(true);
        const config = {
            headers: {
                'con-type': 'connect'
            }
        }
        
        const LOGINTOKEN = localStorage.getItem('@CHATLOGIN/isLogged');

        await api.get('login', config).then(function(res){
            if (!LOGINTOKEN) {
                if (res.data.connected) {
                    setError(null);
                    console.log(res.data);
                    const wellcome = [
                        {
                            uid: 1,
                            inputType: 'text',
                            inputPlaceholder: 'Sua mensagem...',
                            message: 'Olá!'
                        },
                        {
                            uid: 1,
                            inputType: 'text',
                            inputPlaceholder: 'Sua mensagem...',
                            message: 'Eu sou a Leticía e vou te ajudar a fazer LOGIN!'
                        },
                        {
                            uid: 1,
                            inputType: 'text',
                            inputPlaceholder: 'Seu nome de usuario...',
                            message: 'Primeiro preciso que você me envie seu NOME de USUARIO!'
                        }
                    ]
                    EchoMessages(wellcome);
                }
            }else{
                setLogged(true);
                setChatLoader(false);
            }
        }).catch(function(error){
            setChatLoader(false);
            setError('Não foi possivel conectar-se com o servidor!');
        });
        
    }

    useEffect(() => {
        Con()

    }, []);

    async function LogoutF(){
        setLogged(false);
        localStorage.removeItem('@CHATLOGIN/isLogged');
        setChat([]);
        setFormData({
            user: "",
            email: "",
            pass: ""
        });
        console.log({logged: false})
        await Con();
    }

    function RenderChat({ item, index }) {
        if (item.uid === 1) {
            return (
                <ChatMenssageContainer>
                    <ChatUser src={BotAvatar} />
                    <ChatMessage>
                        <p style={{ color: '#919296', fontWeight: 700, maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif', wordBreak: 'break-word' }}>{item.message}</p>
                    </ChatMessage>
                </ChatMenssageContainer>
            )
        }
        return (
            <ChatSendMenssageContainer>
                <ChatUser src={UserAvatar} />
                <ChatSendMessage>
                    <p style={{ color: '#FFFFFF', maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif', wordBreak: 'break-word' }}>{item.message}</p>
                </ChatSendMessage>
            </ChatSendMenssageContainer>
        )
    }

    return (
        <MainContainer>
            <ChatCard logged={logged}>
                <CardHeader>{logged ? 'LOGADO': 'LOGIN'}</CardHeader>
                <Content logged={logged}>
                    {error && <Error>
                        <h3 style={{fontFamily: 'Roboto, Sans-serif', color: 'white', fontWeight: 400, textAlign: 'center'}}>{error || 'Ocorreu um erro desconhecido!'}</h3>
                        <RetryButton onClick={()=> Con()}>TENTAR NOVAMENTE</RetryButton>
                    </Error>}
                    <ChatContent id="chat">
                        {logged &&
                        <UserProfile>
                            <ProfilePic />
                            <ProfileName>Test</ProfileName>
                            <Logout onClick={() => LogoutF()}>SAIR</Logout>
                        </UserProfile>}
                        {!logged && <ChatScroll>
                            {chat.map((item, index) => <RenderChat index={index} key={index} item={item} />)}
                            {chatLoader && <ChatMenssageContainer>
                                <ChatUser src={BotAvatar} />
                                <ChatMessage>
                                    <p style={{ color: '#919296', fontWeight: 700, maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif' }}>Digitando</p>
                                    <svg style={{ width: 50, height: 40, display: 'inline-block', marginLeft: -8 }} version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                        <circle fill="#919296" stroke="none" cx="1" cy="57" r="7">
                                            <animate
                                                attributeName="opacity"
                                                dur="1s"
                                                values="0;1;0"
                                                repeatCount="indefinite"
                                                begin="0.1" />
                                        </circle>
                                        <circle fill="#919296" stroke="none" cx="22" cy="57" r="7">
                                            <animate
                                                attributeName="opacity"
                                                dur="1s"
                                                values="0;1;0"
                                                repeatCount="indefinite"
                                                begin="0.2" />
                                        </circle>
                                        <circle fill="#919296" stroke="none" cx="46" cy="57" r="7">
                                            <animate
                                                attributeName="opacity"
                                                dur="1s"
                                                values="0;1;0"
                                                repeatCount="indefinite"
                                                begin="0.3" />
                                        </circle>
                                    </svg>
                                </ChatMessage>
                            </ChatMenssageContainer>}
                        </ChatScroll>}
                    </ChatContent>
                    {!logged && <InputContent onSubmit={SendMessage}>
                        <Send onClick={SendMessage} type="submit" icon={faPaperPlane} />
                        <ChatInput value={message || ''} disabled={chatLoader} type={input.type} onChange={e => setMessage(e.target.value)} placeholder={input.placeholder} />
                    </InputContent>}
                    {!logged && <Overlay />}
                </Content>
            </ChatCard>
        </MainContainer>
    )
}