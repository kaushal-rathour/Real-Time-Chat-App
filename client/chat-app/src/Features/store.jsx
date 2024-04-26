import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice.jsx";
import refreshSliceReducer from "./refreshSlice.jsx";

export const store = configureStore({
    reducer: {
        themeKey: themeSliceReducer,
        refresh: refreshSliceReducer,
    },
});