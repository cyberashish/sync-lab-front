import { Employee } from "@/components/dashboard/admin/all-employees/employeeData";
import { createSlice } from "@reduxjs/toolkit";

const initialState:Employee = {
    name:"",
    email:"",
    gender:"male",
    mobile_number:"",
    aadhaar_number:"",
    account_number:"",
    department:"",
    designation:"",
    previous_company:"",
    pf_number:"",
    salary:"",
    current_address:"",
    permanent_address:"",
    employeeDOBDate:"",
    employeeJoiningDate:""
  }

const employeeSlice = createSlice({
    name: "employeeData",
    initialState,
    reducers: {
        setSelectedEmployee : (state,action) => {
             return state = action.payload
        } 
    }
});

export const {setSelectedEmployee} =  employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;