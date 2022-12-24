import { configureStore } from "@reduxjs/toolkit";
import galeryReducer from "./features/GalerySlice";
export const store = configureStore({
    reducer:{
        galery : galeryReducer, 
    }
});