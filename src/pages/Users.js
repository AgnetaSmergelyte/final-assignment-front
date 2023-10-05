import React from 'react';
import UserCard from "../components/UserCard";
import {useSelector} from "react-redux";

const Users = () => {
    const username = useSelector(state => state.user.username);
    const users = useSelector(state => state.user.allUsers);
    return (
        <div className="cards p10">
            {users.map(x => username !== x.username && <UserCard key={x._id} user={x}/>)}
        </div>
    );
};

export default Users;