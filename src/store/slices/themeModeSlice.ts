

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface themeModeType{
    theme: string
}

const initialState:themeModeType = {
    theme:"light"
}

export const themeModeSlice = createSlice({
    name:"themeMode",
    initialState,
    reducers: {
        setThemeMode: (state:themeModeType,action:PayloadAction<string>) => {
           state.theme = action.payload
        }
    }
});

const themeModeReducer = themeModeSlice.reducer;
 const {setThemeMode} = themeModeSlice.actions;

 export {themeModeReducer , setThemeMode};

