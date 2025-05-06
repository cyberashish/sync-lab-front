import { createSlice } from "@reduxjs/toolkit";

interface tableType {
    employeeTable: any
}

const initMasterTable:tableType = {
   employeeTable:null
}

const masterTableSlice = createSlice({
    name: "tanstack_table",
    initialState: initMasterTable,
    reducers: {
        setEmployeeTable: (state,action) => {
            state.employeeTable = action.payload
        }
    }
});

export const {setEmployeeTable} = masterTableSlice.actions;
export default masterTableSlice.reducer; 