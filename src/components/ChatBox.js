import React, {useRef, useState} from 'react';
import Message from "./Message";
import {socket} from "../App";
import {useSelector} from "react-redux";
import Conversation from "./Conversation";
import AlertBox from "./AlertBox";

const ChatBox = () => {
    const conversation = useSelector(state => state.user.currentChat);
    const messageRef = useRef();
    const [alert, setAlert] = useState('');
    function sendMessage() {
        const message = messageRef.current.value;
        if (message === '') {
            setAlert('Message empty');
            return;
        } else if (message.length > 1000) {
            setAlert('Message too long');
            return;
        }
        socket.emit('message', {message, recipient: conversation.username});
        messageRef.current.value = '';
    }
    return (
        <div>
            {conversation &&
                <div className="section chat-box">
                    <h2 className="text-center message-field">Chat with {conversation.username}</h2>
                    <Conversation />
                    <div className="d-flex message-field">
                        <input type="text" ref={messageRef} placeholder="Message" className="flex-1"
                               style={{borderRadius: "5px 0 0 5px"}}/>
                        <button className="btn-small btn-dark" style={{borderRadius: "0 5px 5px 0"}}
                                onClick={sendMessage}>Send
                        </button>
                    </div>
                    {alert && <AlertBox alert={alert} setAlert={setAlert}/>}
                </div>}
        </div>
    );
};

export default ChatBox;