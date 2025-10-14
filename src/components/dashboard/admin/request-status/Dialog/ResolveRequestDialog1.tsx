
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useAddEmployeeNotificationMutation, useUpdateEmployeeLeaveMutation, useUpdateEmployeeRequestMutation } from "@/store/api/employeeApi";
import { setApprovalDialog} from "@/store/slices/requestStatusSlice";
import { Loader2 } from "lucide-react";


export default function DisapproveRequestDialog(){
    const isDialogOpen = useAppSelector((state) => state.requestStatus.isApproveDialogOpen);
    const selectedRequest:any = useAppSelector((state) => state.requestStatus.selectedRequest);
    const [updateRequest,{isLoading}] = useUpdateEmployeeRequestMutation();
    const [addEmployeeNotification] = useAddEmployeeNotificationMutation();

    const dispatch = useAppDispatch();
    
    const [updateEmployeeLeave] = useUpdateEmployeeLeaveMutation();
 
    const handleRequest = async () => {
              await updateRequest({id:selectedRequest.id, requestStatus: "Approved" , isRequestApproved: true});
              await updateEmployeeLeave({email: selectedRequest?.email , leave: selectedRequest?.leave , leaveType: selectedRequest?.leaveType})
              dispatch(setApprovalDialog(false));
              await addEmployeeNotification({email:selectedRequest?.email , title : "Leave Approved" , message:"Your leave has been approved!" , type:"LEAVE_REQUEST"})

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