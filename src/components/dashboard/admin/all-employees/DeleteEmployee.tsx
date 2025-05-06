import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setDeletEmployeeDialog, setTransformedEmployees } from "@/store/slices/employeeTableSlice";

export default function DeleteEmployee(){
    const isDialogOpen = useAppSelector((state) => state.employeeTable.isDeleteDialogOpen);
    const dispatch = useAppDispatch();
    const selectedEmployee = useAppSelector((state) => state.employee);
    const allEmployees = useAppSelector((state) => state.employeeTable.employees);

   const deleteEmployee = () => {
       const filteredEmployees = allEmployees.filter((employee) => employee.email !== selectedEmployee.email);
       dispatch(setTransformedEmployees(filteredEmployees));
       dispatch(setDeletEmployeeDialog(false));
   }

    return (
        <>
               <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setDeletEmployeeDialog(value))} >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
            <div className="flex items-center gap-2 mt-3">
              <Button onClick={deleteEmployee} variant="destructive" >Delete</Button>
              <Button onClick={() => dispatch(setDeletEmployeeDialog(false))} >Cancel</Button>
            </div>
        </DialogContent>
      </Dialog>
        </>
    )
}