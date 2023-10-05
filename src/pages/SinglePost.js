import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import UserCard from "../components/UserCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setSinglePost} from "../features/user";

const SinglePost = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('');
    const username = useSelector(state => state.user.username);
    const post = useSelector(state => state.user.singlePost.post);
    const author = useSelector(state => state.user.singlePost.author);

    useEffect(() => {
        fetch("http://localhost:8080/posts/"+id)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.message);
                } else {
                    dispatch(setSinglePost(data.data));
                }
            })
            .catch(err => setErrorMsg('Server Error'));
        return () => dispatch(setSinglePost({post: null, author: null}));
    }, [])
    function likePost() {
        socket.emit("like", id);
    }
    return (
        <div className="p10">
            <h1>{errorMsg}</h1>
            {post &&
            <div className="section-darker d-flex g10 f-wrap">
                <div className="post-pic flex-1">
                    <img src={post.image} alt="post-img"/>
                </div>
                <div className="flex-1 d-flex f-col g10">
                        {author && <UserCard user={author}/>}
                        <h1>{post.text}</h1>
                        <div className="d-flex g10 a-center">
                            <b><FontAwesomeIcon icon={faThumbsUp}/> {post.likes.length}</b>
                            <button className="btn-dark btn-small" onClick={likePost}>
                                <FontAwesomeIcon icon={faThumbsUp}/>
                                {post.likes.includes(username) ? " Unlike" : " Like"}
                            </button>
                        </div>
                </div>
            </div>
            }
        </div>
    );
};

export default SinglePost;