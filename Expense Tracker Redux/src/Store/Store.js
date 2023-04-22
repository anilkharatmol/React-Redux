import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from './ExpenseSlice';

const store=configureStore({
    reducer:{authentication:authReducer,savedExpenses:expenseReducer}
})

export default store;