import { createSlice } from "@reduxjs/toolkit"

const initialAuthState={
    token:localStorage.getItem('token'),
    isLoggedIn:!!localStorage.getItem('token')
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
        localStorage.removeItem('email')}
    }
})

export const authActions=authSlice.actions;

export default authSlice;
