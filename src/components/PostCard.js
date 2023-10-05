import React from 'react';
import {useNavigate} from "react-router-dom";

const PostCard = ({post}) => {
    const nav = useNavigate();
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
        <div className="section post-card d-flex f-col space-btw" onClick={() => nav(`/posts/${post._id}`)}>
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