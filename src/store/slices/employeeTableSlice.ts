import { EmployeeData } from "@/components/dashboard/admin/all-employees/employeeData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditDialogOpen:false,
    employees : EmployeeData,
    isDeleteDialogOpen:false,
    isProfileDialogOpen: false,
    employeeProfileImg:"",
}

const employeeTableSlice = createSlice({
    name:"employeeTable",
    initialState,
    reducers: {
        setEditEmployeeDialog: (state,action) => {
             state.isEditDialogOpen = action.payload
        },
       setProfileDialog: (state , action) => {
        state.isProfileDialogOpen = action.payload
       },
        setTransformedEmployees : (state,action) => {
            state.employees = action.payload
        },
        setDeletEmployeeDialog: (state,action) => {
            state.isDeleteDialogOpen = action.payload
        },
        setEmployeeProfileImg: (state,action) => {
          state.employeeProfileImg = action.payload
        }
    }
});

export const {setEditEmployeeDialog , setTransformedEmployees , setDeletEmployeeDialog , setProfileDialog , setEmployeeProfileImg} = employeeTableSlice.actions;
export const employeeTableReducer = employeeTableSlice.reducer;
