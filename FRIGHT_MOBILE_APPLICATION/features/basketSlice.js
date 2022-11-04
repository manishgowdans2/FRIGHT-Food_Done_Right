import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers:{
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },

        removeFromBasket: (state,action) =>{
          //bellow is gonna check wether the given id is present in the basket to be removed

          const index = state.items.findIndex((item) => item.id === action.payload.id); 

          let newBasket = [...state.items];

          if(index>=0)
          {
            newBasket.splice(index,1);
          }
          else{
            console.warn(`Cannot remove product (id: ${action.payload.id}) as its not in basket!`);
          }


          state.items = newBasket;
        },
    },
});

//Action creators are generated for each case reducer function
export const {addToBasket, removeFromBasket} = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

//bellow code is for the + icon where only that row should be added to the basket
export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item.id === id); 

//to get the total price on the on the basket bar

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item)=> total += item.price,0); //0 is the initial value



export default basketSlice.reducer;