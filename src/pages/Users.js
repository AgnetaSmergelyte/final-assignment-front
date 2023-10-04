import React, {useEffect, useState} from 'react';
import {setAllUsers, setImage, setUsername} from "../features/user";
import UserCard from "../components/UserCard";
import {useDispatch, useSelector} from "react-redux";

const Users = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const users = useSelector(state => state.user.allUsers);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (!token) return;
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        }
        fetch("http://localhost:8080/getAllUsers", options)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    dispatch(setAllUsers(data.data));
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch(error => {
                setErrorMsg('Server Error');
            })
    }, [])


    return (
        <div>
            {errorMsg}
            <div className="cards">
                {users.map(x => username !== x.username && <UserCard key={x._id} user={x} />)}
            </div>

        </div>
    );
};

export default Users;