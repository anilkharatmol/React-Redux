import { createSlice } from "@reduxjs/toolkit"


const initialCartState={cartItems:[],totalQuantity:0}

const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        addToCart(state,action){const cartItem=action.payload
            state.totalQuantity++;
        const existingItemidx=state.cartItems.find(item=>item.id===cartItem.id)
        if(!existingItemidx){
            state.cartItems.push({
                id:cartItem.id,
                title:cartItem.title,
                quantity:1,
                description:cartItem.description,
                price:cartItem.price,
                totalAmount:cartItem.price
            })
        }
        else{
            existingItemidx.quantity+=1;
            existingItemidx.totalAmount+=cartItem.price;
        }
     },
        removeItemFromCart(state,action){
            state.totalQuantity--;
            const id=action.payload;
            const existingItemidx=state.cartItems.find(item=>item.id===id)
            if(existingItemidx.quantity===1){
                state.cartItems=state.cartItems.filter(item=>item.id!==id)
            }
            else{
                existingItemidx.quantity--;
                existingItemidx.totalAmount-=existingItemidx.price;
            }
        }
    }
})

export const cartActions=cartSlice.actions;

export default cartSlice.reducer;