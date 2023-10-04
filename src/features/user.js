import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: '',
        image: '',
        allUsers: [],
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

    }
})

export const {setUsername, setImage, setAllUsers, addNewUser} = userSlice.actions;

export default userSlice.reducer;