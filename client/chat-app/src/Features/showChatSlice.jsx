import { createSlice } from "@reduxjs/toolkit";

export const showChatSlice = createSlice({
  name: "showChat",
  initialState: false,
  reducers: {
    toggleRefresh: (state) => !state,
  },
});

export const { toggleShowChat } = showChatSlice.actions;

export default showChatSlice.reducer;
