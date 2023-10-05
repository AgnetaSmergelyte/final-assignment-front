import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: '',
        image: '',
        allUsers: [],
        allPosts: [],
        singlePost: {post: null, author: null},
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        addNewUser: (state, action) => {
            state.allUsers.push(action.payload);
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload;
        },
        addNewPost: (state, action) => {
            const newPost = action.payload;
            //check if already exists and update
            for (let i = 0; i < state.allPosts.length; i++) {
                if (state.allPosts[i]._id === newPost._id) {
                    state.allPosts[i] = newPost;
                    //if existing post, check if it is open and update
                    if (state.singlePost.post && newPost._id === state.singlePost.post._id) {
                        state.singlePost.post = newPost;
                    }
                    return;
                }
            }
            state.allPosts.push(newPost);
        },
        setSinglePost: (state, action) => {
            state.singlePost = action.payload;
        }
    }
})

export const {setUsername, setImage, setAllUsers, addNewUser, setAllPosts, addNewPost, setSinglePost} = userSlice.actions;

export default userSlice.reducer;