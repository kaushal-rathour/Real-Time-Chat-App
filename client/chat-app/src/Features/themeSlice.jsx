import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "themeSlice",
    initialState: true,
    reducers: {
        themeToggle: (state) => {
            return !state;
        }
    }
});

export const { themeToggle } = themeSlice.actions;

export default themeSlice.reducer;