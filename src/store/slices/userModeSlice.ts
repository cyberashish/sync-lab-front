

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userModeType{
    theme: string,
    isAuthenticated: boolean,
    userInfo: {
        name: string,
        email: string,
        img: string
    }

}

const initialState:userModeType = {
    theme:"light",
    isAuthenticated:false,
    userInfo: {
        name:"",
        email:"",
        img:""
    }
}

export const userModeSlice = createSlice({
    name:"userMode",
    initialState,
    reducers: {
        setThemeMode: (state:userModeType,action:PayloadAction<string>) => {
           state.theme = action.payload
        },
        setAuth: (state:userModeType,action:PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        setAuthenticatedUser: (state:userModeType,action:PayloadAction<{name:string,email:string,img:string}>) => {
           state.userInfo = {...state.userInfo , ...action.payload}
        }
    }
});

const userModeReducer = userModeSlice.reducer;
 const {setThemeMode , setAuth , setAuthenticatedUser} = userModeSlice.actions;

 export {userModeReducer , setThemeMode , setAuth , setAuthenticatedUser};

