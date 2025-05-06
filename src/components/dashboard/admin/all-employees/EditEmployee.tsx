
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setEditEmployeeDialog } from "@/store/slices/employeeTableSlice";
import EmployeeRegistration from "../add-employee/EmployeeRegistration"; 

export default function EditEmployee(){
    const isDialogOpen = useAppSelector((state) => state.employeeTable.isEditDialogOpen);
    const dispatch = useAppDispatch();
    return (
        <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setEditEmployeeDialog(value))} >
        <DialogContent className="sm:max-w-3xl h-[calc(100vh_-_100px)] overflow-auto p-0 gap-0">
          <DialogHeader>
            <DialogTitle className="hidden" >Edit profile</DialogTitle>
          </DialogHeader>
           <EmployeeRegistration/>
        </DialogContent>
      </Dialog>
    )
}