import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imgSelectedUrl: '',
}

const selectSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        select: (state, action) => {
            state.selected = true
            state.imgSelectedUrl = action.payload
        },
    }
});

export const { select } = selectSlice.actions
export default selectSlice.reducer