import React, {useState} from 'react';
import {useSelector} from "react-redux";

const Profile = () => {

    const username = useSelector(state => state.user.username);
    const userImage = useSelector(state => state.user.image);
    const [imageChange, setImageChange] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);

    function changeUserImage() {

    }
    function changeUserPassword() {

    }

    return (
        <div className="p10">
            <div className="d-flex section g20">
                <div className="d-flex f-col g10 profile-pic">
                    <img src={userImage} alt=""/>
                    {imageChange ?
                        <div className="d-flex f-col g10">
                            <input type="text" placeholder="New Image Url"/>
                            <div className="d-flex g10">
                                <button className="btn-dark" onClick={() => setImageChange(false)}>Cancel</button>
                                <button className="btn-dark" onClick={changeUserImage}>Confirm</button>
                            </div>
                        </div> :
                        <button className="btn-dark" onClick={() => setImageChange(true)}>Change Picture</button>}
                </div>
                <div className="d-flex f-col space-btw">
                    <h1>{username}</h1>
                    {passwordChange ?
                        <div className="d-flex f-col g10">
                            <input type="text" placeholder="Current password"/>
                            <input type="text" placeholder="New password"/>
                            <input type="text" placeholder="Repeat new password"/>
                            <div className="d-flex g10">
                                <button className="btn-dark" onClick={() => setPasswordChange(false)}>Cancel</button>
                                <button className="btn-dark" onClick={changeUserPassword}>Confirm</button>
                            </div>
                        </div> :
                        <button className="btn-dark" onClick={() => setPasswordChange(true)}>Change Password</button>}
                </div>
            </div>
        </div>
    );
};

export default Profile;