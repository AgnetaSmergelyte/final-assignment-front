import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ChatWith from "../components/ChatWith";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import ChatBox from "../components/ChatBox";
import {setCurrentChat} from "../features/user";

const openMenu = <FontAwesomeIcon icon={faBars}/>;
const closeMenu = <FontAwesomeIcon icon={faTimes}/>;

const Messages = () => {
    const dispatch = useDispatch();
    const conversations = useSelector(state => state.user.conversations);
    const [toggleMenu, setToggleMenu] = useState(closeMenu);
    const [toggleDisplay, setToggleDisplay] = useState('');

    useEffect(()=>{
        return () => dispatch(setCurrentChat(null))
    }, [])

    function toggleUserMenu() {
        if (toggleMenu === closeMenu) {
            setToggleDisplay('menu-closed');
            setToggleMenu(openMenu);
        } else {
            setToggleDisplay('');
            setToggleMenu(closeMenu);
        }
    }
    return (
        <div className="message-window p10 g10">
            <div className="d-flex f-col g10 section contain-in-window">
                <button className="btn-toggle btn-small" onClick={toggleUserMenu}>{toggleMenu}</button>
                <div className={toggleDisplay + " d-flex f-col g10"}>
                    {conversations.map(x => <ChatWith key={x._id} conversation={x}/>)}
                </div>
            </div>
            <ChatBox />
        </div>
    );
};

export default Messages;