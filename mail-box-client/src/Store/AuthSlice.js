import { createSlice } from "@reduxjs/toolkit"

const initialAuthState={
    token:localStorage.getItem('token'),
    isLoggedIn:!!localStorage.getItem('token'),
    receiverEmailId:'',
    showInbox:false,
    showSent:false
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
        state.receiverEmailId=e;},

        Inbox(state){state.showInbox=true
        state.showSent=false},

        Sent(state){state.showSent=true
        state.showInbox=false}
    }
})

export const authActions=authSlice.actions;

export default authSlice;
