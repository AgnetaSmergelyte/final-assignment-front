import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp, faChevronDown, faComment, faThumbsUp, faClock} from '@fortawesome/free-solid-svg-icons';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../components/PostCard";
import {setAllPosts} from "../features/user";

const ascIcon = <FontAwesomeIcon icon={faChevronUp}/>;
const descIcon = <FontAwesomeIcon icon={faChevronDown}/>;

const Posts = () => {
    const postImageRef = useRef();
    const postTitleRef = useRef();
    const dispatch = useDispatch();
    const posts = useSelector(state => state.user.allPosts);
    const [newPostModal, setNewPostModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [descending, setDescending] = useState(false);

    function submitNewPost() {
        const postInfo = {
            image: postImageRef.current.value,
            text: postTitleRef.current.value
        }
        if (postInfo.image === '' || postInfo.text === '') {
            setErrorMsg('Please fill all empty fields');
            return;
        }
        socket.emit("newPost", postInfo);
        setNewPostModal(false);
    }

    function sortPosts(sortValue) {
        let desc = true;
        if (sortValue === sortBy) desc = !descending
        setDescending(desc);
        if (sortValue === 'comments') {
            if (desc) {
                const newArr = [...posts];
                newArr.sort((a, b) => b.comments.length - a.comments.length);
                dispatch(setAllPosts(newArr));
            } else {
                const newArr = [...posts];
                newArr.sort((a, b) => a.comments.length - b.comments.length);
                dispatch(setAllPosts(newArr));
            }
            setSortBy('comments');
        } else if (sortValue === 'likes') {
            if (desc) {
                const newArr = [...posts];
                newArr.sort((a, b) => b.likes.length - a.likes.length);
                dispatch(setAllPosts(newArr));
            } else {
                const newArr = [...posts];
                newArr.sort((a, b) => a.likes.length - b.likes.length);
                dispatch(setAllPosts(newArr));
            }
            setSortBy('likes');
        } else if (sortValue === 'time') {
            if (desc) {
                const newArr = [...posts];
                newArr.sort((a, b) => b.timestamp - a.timestamp);
                dispatch(setAllPosts(newArr));
            } else {
                const newArr = [...posts];
                newArr.sort((a, b) => a.timestamp - b.timestamp);
                dispatch(setAllPosts(newArr));
            }
            setSortBy('time');
        }
    }

    return (
        <div className="p10">
            <div className="d-flex space-btw f-wrap section a-center mb-10 g10">
                <div className="d-flex">
                    <button className="btn-dark btn-small" onClick={() => setNewPostModal(true)}>+ New Post</button>
                </div>
                <div className="d-flex f-wrap g10 a-center j-center nav">
                    <b>Sort by:</b>
                    <button className="btn-dark btn-small d-flex a-center g10" onClick={() => sortPosts("comments")}>
                        Comments
                        {sortBy === "comments" && (descending ? descIcon : ascIcon)}
                    </button>
                    <button className="btn-dark btn-small d-flex a-center g10" onClick={() => sortPosts("likes")}>
                        Likes
                        {sortBy === "likes" && (descending ? descIcon : ascIcon)}
                    </button>
                    <button className="btn-dark btn-small d-flex a-center g10" onClick={() => sortPosts("time")}>
                        Time Created
                        {sortBy === "time" && (descending ? descIcon : ascIcon)}
                    </button>
                </div>
                <div className="d-flex g10 a-center j-center icon-nav">
                    <button className="btn-dark btn-small d-flex a-center g10" onClick={() => sortPosts("comments")}>
                        <p><FontAwesomeIcon icon={faComment}/></p>
                        {sortBy === "comments" && (descending ? descIcon : ascIcon)}
                    </button>
                    <button className="btn-dark btn-small d-flex a-center g10" onClick={() => sortPosts("likes")}>
                        <p><FontAwesomeIcon icon={faThumbsUp}/></p>
                        {sortBy === "likes" && (descending ? descIcon : ascIcon)}
                    </button>
                    <button className="btn-dark btn-small d-flex a-center g10" onClick={() => sortPosts("time")}>
                        <p><FontAwesomeIcon icon={faClock}/></p>
                        {sortBy === "time" && (descending ? descIcon : ascIcon)}
                    </button>
                </div>
            </div>
            {newPostModal &&
                <div className="modal">
                    <div>
                        <b>New Post:</b>
                        <input type="text" ref={postImageRef} placeholder="Image Url"/>
                        <input type="text" ref={postTitleRef} placeholder="Title"/>
                        <b className="text-red text-center">{errorMsg}</b>
                        <div className="d-flex g10">
                            <button className="btn-small" onClick={() => setNewPostModal(false)}>Cancel</button>
                            <button className="btn-small" onClick={submitNewPost}>Send</button>
                        </div>
                    </div>
                </div>}
            <div className="posts">
                {posts.map(x => <PostCard key={x._id} post={x}/>)}
            </div>
        </div>
    );
};

export default Posts;