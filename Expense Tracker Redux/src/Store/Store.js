import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from './ExpenseSlice';
import themeReducer from './ThemeSlice'

const store=configureStore({
    reducer:{authentication:authReducer,
        savedExpenses:expenseReducer,
        theme:themeReducer}
})

export default store;