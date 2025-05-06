import { EmployeeRequestData, EmployeeRequestType } from "@/components/dashboard/admin/request-status/employeeRequestData";
import { createSlice } from "@reduxjs/toolkit";

const initialState:{
   requestStatusTableData : EmployeeRequestType[],
   isApproveDialogOpen: boolean,
   isDisapproveDialogOpen: boolean,
   selectedRequest:null | EmployeeRequestType
} = {
    requestStatusTableData : EmployeeRequestData,
    isApproveDialogOpen: false,
    isDisapproveDialogOpen: false,
    selectedRequest:null
}

const requestStatusSlice = createSlice({
    name:"requestStatus",
    initialState,
    reducers: {
       transformStatusTableData : (state , action) => {
          state.requestStatusTableData = action.payload
       },
       setApprovalDialog: (state , action) => {
        state.isApproveDialogOpen = action.payload
       },
       setDisapprovalDialog: (state,action) => {
        state.isDisapproveDialogOpen = action.payload
       },
       setSelectedRequest: (state,action) => {
          state.selectedRequest = action.payload
       }
    }
});

export const {transformStatusTableData , setApprovalDialog , setDisapprovalDialog , setSelectedRequest} = requestStatusSlice.actions;
export const RequestStatusReducer = requestStatusSlice.reducer;