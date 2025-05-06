import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/hooks";
import { setApprovalDialog, setDisapprovalDialog, setSelectedRequest } from "@/store/slices/requestStatusSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EmployeeRequestType } from "./employeeRequestData";

export const TableActions = (selectedRequest:EmployeeRequestType) => {
    const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-3">
      {
        selectedRequest.requestStatus === "pending" ? (
          <>
<TooltipProvider>
        <Tooltip>
          <TooltipTrigger  asChild>
            <button onClick={() => {
                dispatch(setSelectedRequest(selectedRequest));
                dispatch(setApprovalDialog(true));
                }} >
            <Icon
              icon="solar:check-circle-bold"
              width={24}
              height={24}
              className="text-primary hover:text-primary/90 cursor-pointer"
            />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Approve request</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => {
                dispatch(setSelectedRequest(selectedRequest));
                dispatch(setDisapprovalDialog(true));
                }} >
            <Icon
              icon="solar:close-circle-bold"
              width={24}
              height={24}
              className="text-red-500 hover:text-red-400 cursor-pointer"
            />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-red-500 fill-red-500">
            <p>Disapprove Request</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
          </>
        ) :  selectedRequest.isRequestApproved ?  <Icon
        icon="solar:verified-check-bold"
        width={24}
        height={24}
        className="text-primary hover:text-primary/90 cursor-pointer"
      /> :  <Icon
      icon="icon-park-twotone:close-one"
      width={24}
      height={24}
      className="text-red-500 hover:text-red-500/20 cursor-pointer"
    />
      }
    </div>
  );
};
