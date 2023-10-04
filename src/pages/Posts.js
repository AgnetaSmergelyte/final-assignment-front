import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {socket} from "../App";

const Posts = () => {

    const [newPostModal, setNewPostModal] = useState(false);

    function submitNewPost() {
        socket.emit("newPost")
    }

    return (
        <div className="p10">
            <div className="d-flex f-wrap section g10 a-center space-btw mb-10">
                <b>Sort by:</b>
                <button className="btn-dark btn-small d-flex a-center g10">
                    Comments
                    <FontAwesomeIcon icon={faChevronDown}/>
                </button>
                <button className="btn-dark btn-small d-flex a-center g10">
                    Likes
                    <FontAwesomeIcon icon={faChevronUp}/>
                </button>
                <button className="btn-dark btn-small d-flex a-center g10">
                    Time Created
                    <FontAwesomeIcon icon={faChevronDown}/>
                </button>
            </div>
            <div className="d-flex j-end">
                <button className="btn-small" onClick={() => setNewPostModal(true)}>Create New Post</button>
            </div>
            {newPostModal && <div className="modal">
                <div>
                    <b>New Post:</b>
                    <input type="text" placeholder="Image Url"/>
                    <input type="text" placeholder="Title"/>
                    <div className="d-flex g10">
                        <button className="btn-small" onClick={() => setNewPostModal(false)}>Cancel</button>
                        <button className="btn-small" onClick={submitNewPost}>Send</button>
                    </div>
                </div>
            </div>}
            posts
        </div>
    );
};

export default Posts;