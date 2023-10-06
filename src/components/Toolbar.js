import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setConversations, setImage, setUsername} from "../features/user";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
const openMenu = <FontAwesomeIcon icon={faBars}/>;
const closeMenu = <FontAwesomeIcon icon={faTimes}/>;

const Toolbar = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [toggleMenu, setToggleMenu] = useState(openMenu);
    const [toggleDisplay, setToggleDisplay] = useState('menu-closed')
    function logout() {
        localStorage.removeItem("autologin");
        sessionStorage.removeItem("token");
        dispatch(setUsername(''));
        dispatch(setImage(''));
        dispatch(setConversations([]));
        nav("/login");
    }
    function toggleMainMenu() {
        if (toggleMenu === closeMenu) {
            setToggleDisplay('menu-closed');
            setToggleMenu(openMenu);
        } else {
            setToggleDisplay('menu-opened');
            setToggleMenu(closeMenu);
        }
    }
    return (
        <div className="toolbar g10 f-wrap">
            <div className="btn-toggle d-flex j-end">
                <button onClick={toggleMainMenu}>{toggleMenu}</button>
            </div>
            <div className={"d-flex g10 f-wrap " + toggleDisplay}>
                <NavLink className="menu-item" to="/">Profile</NavLink>
                <NavLink className="menu-item" to="/messages">Messages</NavLink>
                <NavLink className="menu-item" to="/posts">Posts</NavLink>
                <NavLink className="menu-item" to="/users">Users</NavLink>
            </div>
            <button onClick={logout} className={toggleDisplay}>Log Out</button>
        </div>
    );
};

export default Toolbar;