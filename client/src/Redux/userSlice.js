import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        userID: localStorage.getItem('user'),
    },
    reducers: {
        setUserID: (state, action) => {
            state.userID = action.payload
        },
    },
})

export const { setUserID } = userSlice.actions

export default userSlice.reducer