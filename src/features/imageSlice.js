import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   imgUrl:''
}

const imageSlice = createSlice({
    name:"image",
    initialState,
    reducers:{
        getUrl : (state, action)=>{
           state.imgUrl =  action.payload
        },
    }
})


export const {getUrl} = imageSlice.actions
export default imageSlice.reducer