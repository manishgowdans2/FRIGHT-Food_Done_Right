import {configureStore} from "@reduxjs/toolkit";

import basketReducer from "./features/basketSlice"

import infoReducer from "./features/infoSlice"

export const store = configureStore({
    reducer:{
        basket: basketReducer,
        info: infoReducer,
    },
})