import './App.css';
import Toolbar from "./components/Toolbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewPost, addNewUser, setAllPosts, setAllUsers, setImage, setSinglePost, setUsername} from "./features/user";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import {io} from 'socket.io-client';
import SinglePost from "./pages/SinglePost";

export const socket = io("http://localhost:3001", {
    autoConnect: true
});

function App() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const username = useSelector(state => state.user.username);
    const currentPost = useSelector(state => state.user.singlePost);

    useEffect(() => {
        socket.on('post', post => {
            dispatch(addNewPost(post));
        });
        socket.on('newUserConnected', newUser => {
            console.log(newUser)
            dispatch(addNewUser(newUser));
        });
        //fetch posts and other users
        fetch("http://localhost:8080/getAllPostsAndUsers")
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    dispatch(setAllUsers(data.data.allUsers));
                    dispatch(setAllPosts(data.data.posts));
                }
            })
            .catch(err => {})

        //if autologin or refreshed app when logged in
        let token = sessionStorage.getItem("token");
        if (!token) {
            const autologin = localStorage.getItem("autologin");
            if (autologin) {
                sessionStorage.setItem("token", autologin);
                token = autologin;
            } else {
                nav("/login");
                return;
            }
        }
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        }
        fetch("http://localhost:8080/getUser", options)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    dispatch(setUsername(data.data.username));
                    dispatch(setImage(data.data.image));
                    socket.emit("logged",{username: data.data.username});
                }
            })
            .catch(err => {})
    }, []);

    return (
        <div className="App">
            {username && <Toolbar/>}
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Profile/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/posts/:id" element={<SinglePost/>}/>
                <Route path="/users" element={<Users/>}/>
            </Routes>
        </div>
    );
}

export default App;
