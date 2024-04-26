import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
  name: "refresh",
  initialState: true,
  reducers: {
    toggleRefresh: (state) => !state,
  },
});

export const { toggleRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;