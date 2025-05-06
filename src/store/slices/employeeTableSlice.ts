import { EmployeeData } from "@/components/dashboard/admin/all-employees/employeeData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditDialogOpen:false,
    employees : EmployeeData,
    isDeleteDialogOpen:false
}

const employeeTableSlice = createSlice({
    name:"employeeTable",
    initialState,
    reducers: {
        setEditEmployeeDialog: (state,action) => {
             state.isEditDialogOpen = action.payload
        },
        setTransformedEmployees : (state,action) => {
            state.employees = action.payload
        },
        setDeletEmployeeDialog: (state,action) => {
            state.isDeleteDialogOpen = action.payload
        }
    }
});

export const {setEditEmployeeDialog , setTransformedEmployees , setDeletEmployeeDialog} = employeeTableSlice.actions;
export const employeeTableReducer = employeeTableSlice.reducer;
