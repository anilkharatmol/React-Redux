import { createSlice } from "@reduxjs/toolkit"


const initialState={showCart:false,isSending:false,isError:false,isSuccess:false}

const uiSlice=createSlice({
    name:'ui',
    initialState:initialState,
    reducers:{
        showCart(state){state.showCart=!state.showCart},
        sendData(state){state.isSending=!state.isSending},
        isError(state){state.isError=true},
        isSuccess(state){state.isSuccess=true},

    }
})

export const uiActions=uiSlice.actions;

export default uiSlice.reducer;
