import {configureStore} from "@reduxjs/toolkit";
import songReducer from "./songReducer";

export default configureStore({
    reducer: {
        song: songReducer
    }
})