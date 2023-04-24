import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import uiReducer from './UiSlice';

const store=configureStore({
    reducer:{cart:cartReducer,ui:uiReducer}
})

export default store;