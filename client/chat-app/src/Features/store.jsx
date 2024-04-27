import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice.jsx";
import refreshSliceReducer from "./refreshSlice.jsx";
import showChatReducer from "./showChatSlice.jsx";

export const store = configureStore({
    reducer: {
        themeKey: themeSliceReducer,
        refresh: refreshSliceReducer,
        showChat: showChatReducer,
    },
});