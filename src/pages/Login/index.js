import React, { useState, useEffect } from 'react';
import { CardHeader, ChatCard, ChatContent, ChatInput, ChatMenssageContainer, ChatMessage, ChatSendMenssageContainer, Content, MainContainer, Send, ChatSendMessage, ChatUser, ChatScroll, Overlay, InputContent } from './styles'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import api from '../../services/api';

export default function Login() {
    const [message, setMessage] = useState();
    const [tempChat, setTempChat] = useState();
    const [chatLoader, setChatLoader] = useState();
    const [chat, setChat] = useState([]);

    function SendMessage(e) {
        e.preventDefault();
        if (!message) {
            return
        }

        const NewMessage = {
            uid: 0,
            message: message
        }
        const NewArray = [...chat, NewMessage]
        setChat(NewArray)
    }

    useEffect(() => {
        if (tempChat) {
            const NC = [...chat, tempChat]
            setChat(NC);
        }
    }, [tempChat])

    useEffect(() => {

        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [chat]);


    useEffect(() => {
        const config = {
            headers: {
                'con-type': 'connect'
            }
        }

        async function Con() {
            setChatLoader(true)
            const res = await api.get('login', config);
            if (res.data.connected) {
                console.log(res.data);
                const wellcome = [
                    {
                        uid: 1,
                        isLoading: false,
                        message: 'Olá!'
                    },
                    {
                        uid: 1,
                        isLoading: false,
                        message: 'Eu sou a Leticía e vou te ajudar a fazer LOGIN!'
                    },
                    {
                        uid: 1,
                        isLoading: false,
                        message: 'Primeiro preciso que você me envie seu NOME de USUARIO!'
                    }
                ]
                var rd = wellcome.length
                wellcome.map((item, index) => {
                    setTimeout(() => {
                        if (index + 1 === rd) {
                            setChatLoader(false)
                        }
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
        }
        Con()

    }, []);

    function RenderChat({ item }) {

        if (item.uid === 1) {
            return (
                <ChatMenssageContainer>
                    <ChatUser uid={item.uid} />
                    <ChatMessage>
                        <p style={{ color: '#919296', fontWeight: 700, maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif' }}>{item.message}</p>
                    </ChatMessage>
                </ChatMenssageContainer>
            )
        }
        return (
            <ChatSendMenssageContainer>
                <ChatUser />
                <ChatSendMessage>
                    <p style={{ color: '#FFFFFF', maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif', wordBreak: 'break-word' }}>{item.message}</p>
                </ChatSendMessage>
            </ChatSendMenssageContainer>
        )
    }

    return (
        <MainContainer>
            <ChatCard>
                <CardHeader>LOGIN</CardHeader>
                <Content>
                    <ChatContent id="chat">
                        <ChatScroll>
                            {chat.map((item, index) => <RenderChat key={index} item={item} />)}
                            {chatLoader && <ChatMenssageContainer>
                                <ChatUser />
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
                        </ChatScroll>
                    </ChatContent>
                    <InputContent onSubmit={SendMessage}>
                        <Send onClick={SendMessage} type="submit" icon={faPaperPlane} />
                        <ChatInput onChange={e => setMessage(e.target.value)} placeholder="Sua mensagem..." />
                    </InputContent>
                    <Overlay />
                </Content>
            </ChatCard>
        </MainContainer>
    )
}