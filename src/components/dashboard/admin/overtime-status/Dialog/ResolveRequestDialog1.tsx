
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useAddEmployeeNotificationMutation, useUpdateEmployeeOvertimeMutation, useUpdateEmployeeOvertimeRequestMutation } from "@/store/api/employeeApi";
import { setApprovalDialog} from "@/store/slices/requestStatusSlice";
import { Loader2 } from "lucide-react";
 

export default function DisapproveRequestDialog(){
    const isDialogOpen = useAppSelector((state) => state.requestStatus.isApproveDialogOpen);
    const selectedRequest:any = useAppSelector((state) => state.requestStatus.selectedOvertimeRequest);
    const [updateRequest,{isLoading}] = useUpdateEmployeeOvertimeRequestMutation();
    const [addEmployeeNotification] = useAddEmployeeNotificationMutation();

    const dispatch = useAppDispatch();
    
    const [updateEmployeeOvertime] = useUpdateEmployeeOvertimeMutation();
 
    const handleRequest = async () => {
              // console.log(selectedRequest);
              await updateRequest({id:selectedRequest.id, requestStatus: "Approved" , isRequestApproved: true});
              await updateEmployeeOvertime({email: selectedRequest?.email , overtime: selectedRequest?.overtimeDays})
              dispatch(setApprovalDialog(false));
              await addEmployeeNotification({email:selectedRequest?.email , title : "Overtime Approved" , message:"Your overtime has been approved!" , type:"OVERTIME_REQUEST"})

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setApprovalDialog(value))} >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <Button onClick={handleRequest} disabled={isLoading} className="flex items-center gap-2" >
                {isLoading ? <Loader2 className="animate-spin" /> : null}
                Approve
              </Button>
              <Button variant="destructive" onClick={() => dispatch(setApprovalDialog(false))} >Cancel</Button>
            </div>
        </DialogContent>
      </Dialog>
    )
}