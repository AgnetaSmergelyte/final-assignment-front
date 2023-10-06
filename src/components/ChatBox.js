import React, {useRef} from 'react';
import Message from "./Message";
import {socket} from "../App";
import {useSelector} from "react-redux";

const ChatBox = () => {
    const conversation = useSelector(state => state.user.currentChat);
    const messageRef = useRef();

    function sendMessage() {
        const message = messageRef.current.value;
        if (message === '') return;
        socket.emit('message', {message, recipient: conversation.username});
        messageRef.current.value = '';
    }

    return (
        <div>
            {conversation &&
                <div className="section chat-box">
                    <h2 className="text-center mb-10">Chat with {conversation.username}</h2>
                    <div className="d-flex f-col g10 mb-10">
                        {conversation.messages.map((x, i) => <Message key={i} message={x}/>)}
                    </div>
                    <div className="d-flex">
                        <input type="text" ref={messageRef} placeholder="Message" className="flex-1"
                               style={{borderRadius: "5px 0 0 5px"}}/>
                        <button className="btn-small btn-dark" style={{borderRadius: "0 5px 5px 0"}}
                                onClick={sendMessage}>Send
                        </button>
                    </div>
                </div>}
        </div>
    );
};

export default ChatBox;