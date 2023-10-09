import React, {useRef} from 'react';
import Message from "./Message";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const Conversation = () => {
    const conversation = useSelector(state => state.user.currentChat);
    const messagesEndRef = useRef();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    }
    useEffect(() => {
        scrollToBottom();
    }, [conversation]);
    return (
        <div className="d-flex f-col g10 mb-10 conversation">
            {conversation.messages.map((x, i) => <Message key={i} message={x}/>)}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Conversation;