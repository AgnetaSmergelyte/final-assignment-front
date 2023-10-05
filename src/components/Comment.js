import React from 'react';

const Comment = ({comment}) => {
    const formatDate = (timeStamp) => {
        const dateFormat = new Date(timeStamp);
        return dateFormat.getDate() +
            "/" + (dateFormat.getMonth() + 1) +
            "/" + dateFormat.getFullYear() +
            " " + dateFormat.getHours() +
            ":" + dateFormat.getMinutes() +
            ":" + dateFormat.getSeconds();
    }
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