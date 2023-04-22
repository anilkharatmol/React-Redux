import { createSlice } from "@reduxjs/toolkit";

const  initialAuthState = {
    token: localStorage.getItem("token"),
    isLoggedIn: !!localStorage.getItem("token"),
  };


  
  const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
      login(state, action) {
        const  token = action.payload;
        state.token = token;
        state.isLoggedIn = true;
        localStorage.setItem("token", token);
      },
      logout(state) {
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem("token");
      }
    },
  });

export const authActions=authSlice.actions;

export default authSlice.reducer;