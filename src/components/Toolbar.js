import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUsername} from "../features/user";


const Toolbar = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.username);

    function logout() {
        localStorage.removeItem("autologin");
        sessionStorage.removeItem("token");
        dispatch(setUsername(''));
        nav("/");
    }

    return (
        <div className="toolbar a-center g10 space-even f-wrap">
            <NavLink className="menu-item" to="/profile">Profile</NavLink>
            <NavLink className="menu-item" to="/messages">Messages</NavLink>
            <NavLink className="menu-item" to="/posts">Posts</NavLink>
            <NavLink className="menu-item" to="/users">Users</NavLink>
            <button onClick={logout}>Log Out</button>
        </div>

    );
};

export default Toolbar;