
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setDisapprovalDialog, transformStatusTableData } from "@/store/slices/requestStatusSlice";


export default function ResolveRequestDialog(){
    const isDialogOpen = useAppSelector((state) => state.requestStatus.isDisapproveDialogOpen);
    const selectedRequest = useAppSelector((state) => state.requestStatus.selectedRequest);
    const allRequests = useAppSelector((state) => state.requestStatus.requestStatusTableData);
    const dispatch = useAppDispatch();

    const handleRequest = () => {
       const modifiedRequestTable = allRequests.map((request) => {
         if(request.employeeId === selectedRequest?.employeeId){
            return {...request , requestStatus: "Disapproved" , isRequestApproved: false}
         }else{
            return request
         }
       });
       dispatch(transformStatusTableData(modifiedRequestTable));
       dispatch(setDisapprovalDialog(false));
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setDisapprovalDialog(value))} >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <Button variant="destructive" onClick={handleRequest} >DisApprove</Button>
              <Button  onClick={() => dispatch(setDisapprovalDialog(false))} >Cancel</Button>
            </div>
        </DialogContent>
      </Dialog>
    )
}