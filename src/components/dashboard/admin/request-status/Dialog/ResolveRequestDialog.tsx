
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useUpdateEmployeeRequestMutation } from "@/store/api/employeeApi";
import { setDisapprovalDialog} from "@/store/slices/requestStatusSlice";
import { Loader2 } from "lucide-react";


export default function ResolveRequestDialog(){
    const isDialogOpen = useAppSelector((state) => state.requestStatus.isDisapproveDialogOpen);
    const selectedRequest:any = useAppSelector((state) => state.requestStatus.selectedRequest);
    const dispatch = useAppDispatch();

    const [updateRequest , {isLoading}] = useUpdateEmployeeRequestMutation();

    const handleRequest = async () => {
      const result = await updateRequest({id:selectedRequest?.id ,requestStatus: "Disapproved" , isRequestApproved: false });
      console.log(result);
       dispatch(setDisapprovalDialog(false));
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setDisapprovalDialog(value))} >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <Button disabled={isLoading} variant="destructive" onClick={handleRequest} className="flex items-center gap-2" >
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              DisApprove
              </Button>
              <Button  onClick={() => dispatch(setDisapprovalDialog(false))} >Cancel</Button>
            </div>
        </DialogContent>
      </Dialog>
    )
}