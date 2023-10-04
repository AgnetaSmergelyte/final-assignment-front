import './App.css';
import Toolbar from "./components/Toolbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setImage, setUsername} from "./features/user";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import {io} from 'socket.io-client';

export const socket = io("http://localhost:3001", {
    autoConnect: true
});

function App() {

    const dispatch = useDispatch();
    const nav = useNavigate();
    const username = useSelector(state => state.user.username);

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (!token) {
            const autologin = localStorage.getItem("autologin");
            if (autologin) {
                sessionStorage.setItem("token", autologin);
                token = autologin;
            } else {
                nav("/");
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
                    nav("/profile")
                }
            })
            .catch(error => {
            })
    }, []);

    return (
        <div className="App">
            {username && <Toolbar/>}
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/users" element={<Users/>}/>
            </Routes>
        </div>
    );
}

export default App;
