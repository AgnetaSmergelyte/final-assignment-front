import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: '',
        image: '',
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },

    }
})

export const {setUsername, setImage} = userSlice.actions;

export default userSlice.reducer;