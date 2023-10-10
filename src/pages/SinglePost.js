import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import UserCard from "../components/UserCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setSinglePost} from "../features/user";
import Comment from "../components/Comment";

const SinglePost = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('');
    const username = useSelector(state => state.user.username);
    const post = useSelector(state => state.user.singlePost.post);
    const author = useSelector(state => state.user.singlePost.author);
    const commentRef = useRef();
    useEffect(() => {
        fetch("http://localhost:8080/posts/" + id)
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
    }, []);
    function likePost() {
        socket.emit("like", id);
    }
    function sendComment() {
        const comment = commentRef.current.value;
        if (!comment) return;
        socket.emit("comment", {postId: id, comment});
        commentRef.current.value = '';
    }
    return (
        <div className="p10">
            <h1>{errorMsg}</h1>
            {post &&
                <div className="section-darker">
                    <div className="d-flex g10 f-wrap mb-10">
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
                    <div className="section">
                        {post.comments.length > 0 ?
                            <div className="d-flex f-col g10 mb-10">
                            {post.comments.map((x, i) => <Comment key={i} comment={x}/>)}
                        </div> : <p className="mb-10">Be first to leave a comment:</p>}
                        <div className="d-flex">
                            <input type="text" className="flex-1" ref={commentRef} placeholder="Write a comment..."
                                   style={{borderRadius: "5px 0 0 5px"}}/>
                            <button className="btn-dark btn-small" onClick={sendComment} style={{borderRadius: "0 5px 5px 0"}}>Send</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SinglePost;