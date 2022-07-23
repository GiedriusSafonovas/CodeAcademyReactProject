import {configureStore} from "@reduxjs/toolkit";
import songReducer from "./songReducer";
import userReducer from "./userReducer";

export default configureStore({
    reducer: {
        song: songReducer,
        user: userReducer
    }
})