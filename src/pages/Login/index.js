import React from 'react';
import { ChatCard, ChatInput, Content, MainContainer, Send } from './styles'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login(){
    return(
        <MainContainer>
            <ChatCard>
                <Content>
                
                    <Send icon={faPaperPlane} />
                    <ChatInput placeholder="Sua mensagem..." />
                </Content>
            </ChatCard>
        </MainContainer>
    )
}