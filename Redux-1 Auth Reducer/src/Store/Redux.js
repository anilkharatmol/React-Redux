import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialCounetrState={counter:1,showCounter:true}                          

const counterSlice= createSlice({
    name:'counter',
    initialState:initialCounetrState,
    reducers:{
        increment(state){ state.counter++},
        decrement(state){state.counter--},
        incrementby5(state,action){state.counter+=action.payload},
        decrementby5(state,action){state.counter-=action.payload},
        toggle(state){state.showCounter=!state.showCounter}
    }
})

const initialAuthState={isAuthenticated:false}

const authSlice= createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){state.isAuthenticated=true},
        logout(state){state.isAuthenticated=false}
    }
})

export const counterActions= counterSlice.actions;
export const authActions=authSlice.actions;

const store=configureStore({
    reducer:{counter:counterSlice.reducer,authentication:authSlice.reducer}
});

export default store;