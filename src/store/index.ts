import { configureStore } from "@reduxjs/toolkit";
import  tanstackTableReducer  from "./slices/masterTableSlice";
import { employeeTableReducer } from "./slices/employeeTableSlice";
import { employeeReducer } from "./slices/employeeSlice";
import { RequestStatusReducer } from "./slices/requestStatusSlice";
import { userApi } from "./api/userApi";
import { userModeReducer } from "./slices/userModeSlice";
import { employeeApi } from "./api/employeeApi";

const store = configureStore({
    reducer:{
        userMode:userModeReducer,
        tanstack:tanstackTableReducer,
        employeeTable: employeeTableReducer,
        employee: employeeReducer,
        requestStatus: RequestStatusReducer,
        [userApi.reducerPath]: userApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(employeeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export {store}