import React from 'react';
import formatDate from "../features/time";

const Comment = ({comment}) => {
    return (
        <div className="d-flex">
            <div className="comment">
                <em className="d-flex g10">
                    <b>{comment.author}</b>
                    <p>{formatDate(comment.timestamp)}</p>
                </em>
                <p>{comment.text}</p>
            </div>
        </div>
    );
};

export default Comment;