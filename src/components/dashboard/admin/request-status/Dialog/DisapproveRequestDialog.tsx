
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setApprovalDialog, transformStatusTableData } from "@/store/slices/requestStatusSlice";


export default function DisapproveRequestDialog(){
    const isDialogOpen = useAppSelector((state) => state.requestStatus.isApproveDialogOpen);
    const selectedRequest = useAppSelector((state) => state.requestStatus.selectedRequest);
    const allRequests = useAppSelector((state) => state.requestStatus.requestStatusTableData);
    const dispatch = useAppDispatch();

    const handleRequest = () => {
       const modifiedRequestTable = allRequests.map((request) => {
         if(request.employeeId === selectedRequest?.employeeId){
            return {...request , requestStatus: "Approved" , isRequestApproved: true}
         }else{
            return request
         }
       });
       dispatch(transformStatusTableData(modifiedRequestTable));
       dispatch(setApprovalDialog(false));
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setApprovalDialog(value))} >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <Button onClick={handleRequest} >Approve</Button>
              <Button variant="destructive" onClick={() => dispatch(setApprovalDialog(false))} >Cancel</Button>
            </div>
        </DialogContent>
      </Dialog>
    )
}