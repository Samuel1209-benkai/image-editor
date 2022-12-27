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
        deleteUrl : (state, action)=>{
            state.imgUrl =  ''
         },
    }
})


export const {getUrl,deleteUrl} = imageSlice.actions
export default imageSlice.reducer