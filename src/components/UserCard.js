import React, {useRef, useState} from 'react';
import {socket} from "../App";
import {useSelector} from "react-redux";

const UserCard = ({user}) => {
    const [messageModal, setMessageModal] = useState(false);
    const username = useSelector(state => state.user.username);
    const messageRef = useRef();
    function sendMessage() {
        const message = messageRef.current.value;
        if (message === '') return;
        socket.emit('message', {message, recipient: user.username});
        setMessageModal(false);
    }
    return (
        <div className="user-card d-flex g10 p10">
            <div className="avatar">
                <img src={user.image} alt=""/>
            </div>
            <div className="d-flex f-col space-even flex-1">
                <h3>{user.username}</h3>
                {username !== user.username && <button className="btn-dark btn-small" onClick={() => setMessageModal(true)}>Write message</button>}
            </div>
            {messageModal &&
                <div className="modal">
                    <div>
                        <b>Message to {user.username}:</b>
                        <textarea className="w-100" ref={messageRef} placeholder="Enter your message here..." rows="5" />
                        <div className="d-flex g10">
                            <button className="btn-small" onClick={() => setMessageModal(false)}>Cancel</button>
                            <button className="btn-small" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserCard;