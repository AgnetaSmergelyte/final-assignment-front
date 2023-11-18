import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setConversations, setImage, setUsername} from "../features/user";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faEnvelope, faNewspaper, faUsers, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {socket} from "../App";

const Toolbar = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        socket.emit('logout');
        localStorage.removeItem("autologin");
        sessionStorage.removeItem("token");
        dispatch(setUsername(''));
        dispatch(setImage(''));
        dispatch(setConversations([]));
        nav("/login");
    }

    return (
        <div>
            <div className="toolbar nav">
                <NavLink className="menu-item" to="/">Profile</NavLink>
                <NavLink className="menu-item" to="/messages">Messages</NavLink>
                <NavLink className="menu-item" to="/posts">Posts</NavLink>
                <NavLink className="menu-item" to="/users">Users</NavLink>
                <button className="menu-item"  onClick={logout}>Log Out</button>
            </div>
            <div className="toolbar icon-nav">
                <NavLink className="menu-item" to="/"><FontAwesomeIcon icon={faUser}/></NavLink>
                <NavLink className="menu-item" to="/messages"><FontAwesomeIcon icon={faEnvelope}/></NavLink>
                <NavLink className="menu-item" to="/posts"><FontAwesomeIcon icon={faNewspaper}/></NavLink>
                <NavLink className="menu-item" to="/users"><FontAwesomeIcon icon={faUsers}/></NavLink>
                <button className="menu-item"  onClick={logout}><FontAwesomeIcon icon={faSignOut}/></button>
            </div>
        </div>
    );
};

export default Toolbar;