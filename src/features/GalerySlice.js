import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    galeryItems : [],
    amount : 0,
}

const galerySlice = createSlice({
    name:"galery",
    initialState,
    reducers:{
        addPicture : (state, action)=>{
            console.log(action)
            state.galeryItems.push(action.payload)
        },

        incrementAmount : (state , action)=>{
            state.amount += 1 
               }
    }
})


export const {addPicture,incrementAmount} = galerySlice.actions
export default galerySlice.reducer