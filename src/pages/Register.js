import React, {useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const Register = () => {

    const nav = useNavigate();
    const usernameRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();
    const [errorMsg, setErrorMsg] = useState('');

    async function signup() {
        const username = usernameRef.current.value;
        const password1 = password1Ref.current.value;
        const password2 = password2Ref.current.value;

        if (username.length < 4) {
            setErrorMsg('Username too short');
            return;
        }
        if (username.length > 20) {
            setErrorMsg('Username too long');
            return;
        }
        if (password1.length < 4) {
            setErrorMsg('Password too short');
            return;
        }
        if (password1.length > 20) {
            setErrorMsg('Password too long');
            return;
        }
        if (!password1.match(/(?=.*[A-Z])/)) {
            setErrorMsg('Password should have at least one uppercase letter');
            return;
        }
        if (!password1.match(/(?=.*[a-z])/)) {
            setErrorMsg('Password should have at least one lowercase letter');
            return;
        }
        if (!password1.match(/(?=.*\d)/)) {
            setErrorMsg('Password should have at least one numerical digit');
            return;
        }
        if (password1 !== password2) {
            setErrorMsg('Passwords do not match');
            return;
        }
        const userData = {
            username,
            password: password1,
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        }
        try {
            const res = await fetch("http://localhost:8080/signup", options);
            const data = await res.json();
            if (data.error) {
                setErrorMsg(data.message);
            } else {
                nav("/");
            }
        } catch (err) {
            setErrorMsg('Server Error');
        }
    }

    return (
        <div className="container">
            <div className="form">
                <input type="text" ref={usernameRef} placeholder="Username"/>
                <input type="password" ref={password1Ref} placeholder="Password"/>
                <input type="password" ref={password2Ref} placeholder="Repeat your password"/>
                <b className="text-center text-red">{errorMsg}</b>
                <button onClick={signup}>Sign Up</button>
            </div>
            <div className="text-center">Go to
                <NavLink className="link" to="/">Log In</NavLink>
                instead
            </div>
        </div>
    );
};

export default Register;