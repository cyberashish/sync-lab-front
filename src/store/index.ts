import { configureStore } from "@reduxjs/toolkit";
import { themeModeReducer } from "./slices/themeModeSlice";
import  tanstackTableReducer  from "./slices/masterTableSlice";
import { employeeTableReducer } from "./slices/employeeTableSlice";
import { employeeReducer } from "./slices/employeeSlice";
import { RequestStatusReducer } from "./slices/requestStatusSlice";

const store = configureStore({
    reducer:{
        themeMode:themeModeReducer,
        tanstack:tanstackTableReducer,
        employeeTable: employeeTableReducer,
        employee: employeeReducer,
        requestStatus: RequestStatusReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export {store}