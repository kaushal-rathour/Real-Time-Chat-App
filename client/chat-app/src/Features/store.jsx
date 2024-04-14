import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice.jsx";

export const store = configureStore({
    reducer: {
        themeKey: themeSliceReducer,
    },
});