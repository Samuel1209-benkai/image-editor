import { configureStore } from "@reduxjs/toolkit";
import galeryReducer from "./features/GalerySlice";
import imageReducer from "./features/imageSlice";
import selectReducer from "./features/selectSlice";
export const store = configureStore({
    reducer:{
        galery : galeryReducer, 
        image : imageReducer,
        select : selectReducer,
    }
});