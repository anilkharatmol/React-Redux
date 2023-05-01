import { createSlice } from "@reduxjs/toolkit"

const initialAuthState={
    token:localStorage.getItem('token'),
    isLoggedIn:!!localStorage.getItem('token'),
    receiverEmailId:''
}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isLoggedIn=true
            const token=action.payload;
            state.token=token;
        localStorage.setItem('token',token)},

        logout(state){state.isLoggedIn=false
        state.token=null;
        localStorage.removeItem('token')
        localStorage.removeItem('email')},

        setReceiverEmail(state,action){const e=action.payload
        state.receiverEmailId=e;}
    }
})

export const authActions=authSlice.actions;

export default authSlice;
