import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userData = (action.payload);
        },
        logoutUser: (state) => {
            state.userData = {};
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;