import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

export const ChatCard = styled.div`
    min-width:  360px;
    display: flex;
    align-items: flex-end;
    height: 500px;
    border-radius: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background-color: #FBDA61;
    background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
    
    @media(max-width: 460px){
        width: 100vw;
        height: 100vh;
        border-radius: 0px;
    }

`;

export const Content = styled.div`
    width: 100%;
    height: 430px;
    position: relative;
    background: white;
    border-radius: 30px;

    @media(max-width: 460px){
        height: calc(100vh - 130px);
        border-radius: 0px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }
`;

export const ChatInput = styled.input`
    width: 88%;
    height: 40px;
    border: 0px solid black;
    border-radius: 20px;
    padding-left: 20px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    outline: none;
    font-family: 'Roboto', sans-serif;
    bottom: 12px;
    background: #F6F6F6;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    color: #383B3D;

    &::placeholder{
        color: #383B3D
    }
`;

export const Send = styled(FontAwesomeIcon)`
    color: #2EC3FF;
    position: absolute;
    margin: auto;
    font-size: 16px;
    padding: 8px;
    border-radius: 100px;
    bottom: 16px;
    right: 18px;
    cursor: pointer;
    z-index: 1;

    &:hover{
        background: rgba(46, 195, 255, 0.3);
    }

    @media(max-width: 460px){
        right: 22px;
        bottom: 16.5px;
        -webkit-tap-highlight-color: transparent;
    }
`;