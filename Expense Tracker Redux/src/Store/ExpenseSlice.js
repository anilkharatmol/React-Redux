import { createSlice } from "@reduxjs/toolkit";


const initialExpenseState={expenses:[]}

const expenseSlice=createSlice({
    name:'expenses',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state,action){state.expenses.push(action.payload)},
        deleteExpense(state,action){const newList= state.expenses.filter((expItem) => expItem.id !== action.payload)
        state.expenses=newList},
        fethedExpenses(state,action){state.expenses=action.payload}
    }
})

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;