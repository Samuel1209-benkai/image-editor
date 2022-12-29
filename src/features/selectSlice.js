import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected : true ,
    imgSelectedUrl:'',
}

const selectSlice = createSlice({
    name:"selected",
    initialState,
    reducers : {
        select :(state,action)=>{
            state.selected  = true  
            state.imgSelectedUrl =  action.payload
        },
        unselect : (state,action)=>{
            state.selected  = false  
            state.imgSelectedUrl =  ''
        }
    }
}); 

export const {select , unselect} = selectSlice.actions
export default selectSlice.reducer