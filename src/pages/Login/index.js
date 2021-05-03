import React, { useState, useRef, useEffect } from 'react';
import { CardHeader, ChatCard, ChatContent, ChatInput, ChatMenssageContainer, ChatMessage, ChatSendMenssageContainer, Content, MainContainer, Send, ChatSendMessage, ChatUser } from './styles'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


export default function Login(){
    const [messageHeight, setMessageHeight] = useState();
    const [SendMessageHeight, setSendMessageHeight] = useState();
    const refMessageHeight = useRef(null);
    const refSendMessageHeight = useRef(null);
    const [message, setMessage] = useState();
    const [chat, setChat] = useState([
        {
            uid: 1,
            message: 'Olá sadasdasdasd dasdasdasdas asdasdasdas asdasdasada asdasdsada'
        },
        {
            uid: 0,
            message: 'Tudo Bem ?'
        },
    ]);

    function SendMessage(){

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
    
    useEffect ( () => {
        if(refMessageHeight.current && refSendMessageHeight.current){
            
            let messageheight1 = refMessageHeight.current.offsetHeight;
            let sendMessageHeight1 = refSendMessageHeight.current.offsetHeight;
            setMessageHeight(messageheight1)
            setSendMessageHeight(sendMessageHeight1)
        }
        
    }, [refMessageHeight, refSendMessageHeight]);

    function RenderChat( {item} ){

        if (item.uid === 1) {
        return(
            <ChatMenssageContainer height={messageHeight}>
                <ChatUser uid={item.uid} />
                <ChatMessage ref={refMessageHeight}>
                    <p style={{color: '#919296', fontWeight: 700, maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif'}}>{item.message}</p>
                </ChatMessage>
            </ChatMenssageContainer>
            )
        }
        return(
                <ChatSendMenssageContainer height={SendMessageHeight}>
                    <ChatUser />
                    <ChatSendMessage ref={refSendMessageHeight}>
                        <p style={{color: '#FFFFFF', maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif'}}>{item.message}</p>
                    </ChatSendMessage>
                </ChatSendMenssageContainer>
        )
    }

    return(
        <MainContainer>
            <ChatCard>
                <CardHeader>LOGIN</CardHeader>
                <Content>
                    <ChatContent>
                        {chat.map((item, index) => <RenderChat key={index} item={item}/>)}
                    </ChatContent>
                    <Send onClick={SendMessage} icon={faPaperPlane} />
                    <ChatInput onChange={e => setMessage(e.target.value)} placeholder="Sua mensagem..." />
                </Content>
            </ChatCard>
        </MainContainer>
    )
}