import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSLice",
    initialState: true,
    reducers: {
        userToggle: (state) => {
            return !state;
        }
    }
});

export const { userToggle } = userSlice.actions;

export default userSlice.reducer;