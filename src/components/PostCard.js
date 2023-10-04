import React from 'react';

const PostCard = ({post}) => {
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
        <div className="section post-card d-flex f-col space-btw">
            <div>
                <img src={post.image} alt="post-image"/>
                <h3>{post.text}</h3>
            </div>
            <div>
                <em>Posted by: {post.author}</em>
                <div><em>{formatDate(post.timestamp)}</em></div>
                <p>Likes: {post.likes.length}</p>
                <p>Comments: {post.comments.length}</p>
            </div>
        </div>
    );
};

export default PostCard;