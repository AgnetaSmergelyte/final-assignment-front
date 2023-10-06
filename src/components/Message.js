import React from 'react';
import {useSelector} from "react-redux";
import formatDate from "../features/time";

const Message = ({message}) => {
    const username = useSelector(state => state.user.username);
    return (
        <div className={username === message.author ? "d-flex my-msg" : "d-flex"}>
            <div className="comment">
                <div className="d-flex space-btw g10">
                    <b>{message.author}</b>
                    <em>{formatDate(message.timestamp)}</em>
                </div>
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default Message;