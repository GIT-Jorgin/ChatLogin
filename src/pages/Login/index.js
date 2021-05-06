import React, { useState, useEffect } from 'react';
import { CardHeader, ChatCard, ChatContent, ChatInput, ChatMenssageContainer, ChatMessage, ChatSendMenssageContainer, Content, MainContainer, Send, ChatSendMessage, ChatUser, ChatScroll, Overlay, InputContent } from './styles'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


export default function Login(){
    const [message, setMessage] = useState();
    const [chat, setChat] = useState([
        {
            uid: 1,
            message: 'Olá!'
        },
        {
            uid: 0,
            message: 'Tudo Bem ?'
        },
    ]);

    function SendMessage(e){
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
    
    useEffect ( () => {

        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [chat]);


    function RenderChat( {item} ){

        if (item.uid === 1) {
        return(
            <ChatMenssageContainer>
                <ChatUser uid={item.uid} />
                <ChatMessage>
                    <p style={{color: '#919296', fontWeight: 700, maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif'}}>{item.message}</p>
                </ChatMessage>
            </ChatMenssageContainer>
            )
        }
        return(
                <ChatSendMenssageContainer>
                    <ChatUser />
                    <ChatSendMessage>
                        <p style={{color: '#FFFFFF', maxWidth: 230, margin: 10, fontFamily: 'Roboto, sans-serif', wordBreak: 'break-word' }}>{item.message}</p>
                    </ChatSendMessage>
                </ChatSendMenssageContainer>
        )
    }

    return(
        <MainContainer>
            <ChatCard>
                <CardHeader>LOGIN</CardHeader>
                <Content>
                    <ChatContent id="chat">
                        <ChatScroll>
                            {chat.map((item, index) => <RenderChat key={index} item={item}/>)}
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