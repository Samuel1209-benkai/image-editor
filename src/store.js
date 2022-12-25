import { configureStore } from "@reduxjs/toolkit";
import galeryReducer from "./features/GalerySlice";
import imageReducer from "./features/imageSlice"
export const store = configureStore({
    reducer:{
        galery : galeryReducer, 
        image : imageReducer,
    }
});