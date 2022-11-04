import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    restaurant:{
        id:null,
        imgUrl:null,
        title:null,
        rating:null,
        genre: null,
        address: null,
        short_description:null,
        dishes: null,
    }
}

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers:{
        setInfo:(state, action) =>{
            state.info = action.payload;
        }
    },
});

//Action creators are generated for each case reducer function
export const {setInfo} = infoSlice.actions;

export const selectInfo = (state) => state.info.info;





export default infoSlice.reducer;