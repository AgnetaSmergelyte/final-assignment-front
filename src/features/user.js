import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: '',
        image: '',
        allUsers: [],
        allPosts: [],
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        addNewUser: (state, action) => {
            state.allUsers.push(action.payload)
        },
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        addNewPost: (state, action) => {
            state.allPosts.push(action.payload)
        },

    }
})

export const {setUsername, setImage, setAllUsers, addNewUser, setAllPosts, addNewPost} = userSlice.actions;

export default userSlice.reducer;