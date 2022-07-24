import {configureStore} from "@reduxjs/toolkit";
import songReducer from "./songReducer";
import userReducer from "./userReducer";
import LikeReducerTest from "./LikeReducerTest";

export default configureStore({
    reducer: {
        song: songReducer,
        user: userReducer,
        likes: LikeReducerTest
    }
})