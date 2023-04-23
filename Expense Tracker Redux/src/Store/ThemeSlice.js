import { createSlice } from "@reduxjs/toolkit"

const initialThemeState={isDarkTheme:false,isPremiumActive:false}

const themeSlice=createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        setDark(state){state.isDarkTheme=true
            state.isPremiumActive=true},
        switchTheme(state){state.isDarkTheme=!state.isDarkTheme}
    }
})

export const themeActions=themeSlice.actions;

export default themeSlice.reducer;