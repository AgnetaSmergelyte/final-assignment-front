import React from 'react';
import {useDispatch} from "react-redux";
import {setCurrentChat} from "../features/user";

const ChatWith = ({conversation}) => {
    const dispatch = useDispatch();
    return (
        <div className="chat-card d-flex g10 p10 a-center" onClick={() => dispatch(setCurrentChat(conversation))}>
            <div className="chat-avatar">
                <img src={conversation.image} alt=""/>
            </div>
            <div className="d-flex f-col space-even flex-1">
                <h3>{conversation.username}</h3>
                <em className="last-msg">{conversation.messages[conversation.messages.length-1].text}</em>
            </div>
        </div>
    );
};

export default ChatWith;