import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setImage} from "../features/user";

const Profile = () => {

    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const userImage = useSelector(state => state.user.image);
    const [imageChange, setImageChange] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [urlErrorMsg, setUrlErrorMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const imageRef = useRef();
    const passwordOldRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();

    function openImageChangeBox() {
        setImageChange(true);
        setUrlErrorMsg('');
    }
    async function changeUserImage() {
        const newImage = imageRef.current.value;
        if (!newImage) {
            setUrlErrorMsg('Enter Image Url');
            return;
        }

        const token = sessionStorage.getItem("token");
        if (token) {
            const userData = {
                image: newImage
            }
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": token
                },
                body: JSON.stringify(userData)
            }
            try {
                const res = await fetch("http://localhost:8080/newImage", options);
                const data = await res.json();
                if (!data.error) {
                    dispatch(setImage(data.data));
                } else {
                    console.log('fail')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    function openPasswordChangeBox() {
        setPasswordChange(true);
        setErrorMsg('');
    }
    async function changeUserPassword() {
        setErrorMsg('');
        let token = sessionStorage.getItem("token");
        if (!token) return;
        const oldPassword = passwordOldRef.current.value;
        const newPassword = password1Ref.current.value;
        const newPassword2 = password2Ref.current.value;
        //old password verifications
        if (oldPassword.length < 4 || oldPassword.length > 20 ||
            !oldPassword.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
            setErrorMsg('Incorrect password');
            return;
        }
        //verifications for new password
        if (newPassword.length < 4) {
            setErrorMsg('New password too short');
            return;
        }
        if (newPassword.length > 20) {
            setErrorMsg('New password too long');
            return;
        }
        if (!newPassword.match(/(?=.*[A-Z])/)) {
            setErrorMsg('New password should have at least one uppercase letter');
            return;
        }
        if (!newPassword.match(/(?=.*[a-z])/)) {
            setErrorMsg('New password should have at least one lowercase letter');
            return;
        }
        if (!newPassword.match(/(?=.*\d)/)) {
            setErrorMsg('New password should have at least one numerical digit');
            return;
        }
        if (newPassword !== newPassword2) {
            setErrorMsg('Passwords do not match');
            return;
        }
        const userData = {
            oldPassword,
            newPassword
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify(userData)
        }
        try {
            const res = await fetch("http://localhost:8080/newPassword", options);
            const data = await res.json();
            if (data.error) {
                setErrorMsg(data.message);
            } else {
                setErrorMsg(data.message);
            }
        } catch (err) {
            setErrorMsg('Server Error');
        }
    }

    return (
        <div className="p10">
            <div className="d-flex section g10">
                <div className="d-flex f-col g10 profile-pic space-btw">
                    <img src={userImage} alt=""/>
                    {imageChange ?
                        <div className="d-flex f-col g10">
                            <input type="text" ref={imageRef} placeholder="New Image Url"/>
                            <b className="text-red text-center">{urlErrorMsg}</b>
                            <div className="d-flex g10 j-center">
                                <button className="btn-dark" onClick={() => setImageChange(false)}>Cancel</button>
                                <button className="btn-dark" onClick={changeUserImage}>Confirm</button>
                            </div>
                        </div> :
                        <button className="btn-dark" onClick={openImageChangeBox}>Change Picture</button>}
                </div>
                <div className="d-flex f-col space-btw">
                    <h1>{username}</h1>
                    {passwordChange ?
                        <div className="d-flex f-col g10">
                            <input type="password" ref={passwordOldRef} placeholder="Current password"/>
                            <input type="password" ref={password1Ref} placeholder="New password"/>
                            <input type="password" ref={password2Ref} placeholder="Repeat new password"/>
                            <b className="text-red text-center">{errorMsg}</b>
                            <div className="d-flex g10">
                                <button className="btn-dark" onClick={() => setPasswordChange(false)}>Cancel</button>
                                <button className="btn-dark" onClick={changeUserPassword}>Confirm</button>
                            </div>
                        </div> :
                        <button className="btn-dark" onClick={openPasswordChangeBox}>Change Password</button>}
                </div>
            </div>
        </div>
    );
};

export default Profile;