import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useAllEmployeesQuery, useDeleteEmployeeMutation } from "@/store/api/employeeApi";
import { setDeletEmployeeDialog } from "@/store/slices/employeeTableSlice";
import { Loader2 } from "lucide-react";

export default function DeleteEmployee(){
    const isDialogOpen = useAppSelector((state) => state.employeeTable.isDeleteDialogOpen);
    const dispatch = useAppDispatch();
    const selectedEmployee = useAppSelector((state) => state.employee);

    const [deleteEmployee,{isLoading}] = useDeleteEmployeeMutation();
    const {data} = useAllEmployeesQuery(undefined);

   const handleDeleteEmployee = async () => {
        const filteredEmployee = data.data.find((item:any) => item.email === selectedEmployee.email);
       const result =   await deleteEmployee({id:filteredEmployee.id});
        // dispatch(setDeletEmployeeDialog(false));
        if(result.error){
          console.log(result,"delete data")
        }else{
          dispatch(setDeletEmployeeDialog(false));
        }
   }

    return (
        <>
               <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setDeletEmployeeDialog(value))} >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <Button onClick={handleDeleteEmployee} disabled={isLoading} variant="destructive" >
              {isLoading ?  <Loader2 className="animate-spin" /> : null}
                Delete</Button>
              <Button onClick={() => dispatch(setDeletEmployeeDialog(false))} >Cancel</Button>
            </div>
        </DialogContent>
      </Dialog>
        </>
    )
}