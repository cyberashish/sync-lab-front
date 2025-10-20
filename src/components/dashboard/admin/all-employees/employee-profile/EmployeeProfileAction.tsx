import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/hooks";
import { setSelectedEmployee } from "@/store/slices/employeeSlice";
import { Employee } from "../employeeData";
import { setEmployeeProfileImg, setProfileDialog } from "@/store/slices/employeeTableSlice";


export const EmployeeProfileAction = (selectedEmployee:Employee) => {
    const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-3">
    <TooltipProvider>
        <Tooltip>
          <TooltipTrigger  asChild>
            <button className="group cursor-pointer" onClick={() => {
                  dispatch(setSelectedEmployee(selectedEmployee))
                dispatch(setProfileDialog(true));
                dispatch(setEmployeeProfileImg(""));
                }} >
             <p className="text-primary group-hover:text-primary/80" >{selectedEmployee.employeeId}</p>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Employee Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
