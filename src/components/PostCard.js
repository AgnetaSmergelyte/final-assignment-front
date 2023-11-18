import React from 'react';
import {useNavigate} from "react-router-dom";
import formatDate from "../features/time";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faThumbsUp, faClock, faUser} from '@fortawesome/free-solid-svg-icons';

const PostCard = ({post}) => {
    const nav = useNavigate();
    return (
        <div className="section post-card d-flex f-col space-btw" onClick={() => nav(`/posts/${post._id}`)}>
            <div className="mb-10">
                <img src={post.image} alt="post-image"/>
                <h3>{post.text}</h3>
            </div>
            <div className="d-flex f-col g5">
                <em><FontAwesomeIcon icon={faUser}/> {post.author}</em>
                <div><FontAwesomeIcon icon={faClock}/> <em>{formatDate(post.timestamp)}</em></div>
                <div className="d-flex g10">
                    <p><FontAwesomeIcon icon={faThumbsUp}/> {post.likes.length}</p>
                    <p><FontAwesomeIcon icon={faComment}/>  {post.comments.length}</p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;