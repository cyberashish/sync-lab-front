import { ColumnDef } from "@tanstack/react-table";
import { EmployeeRequestType } from "./employeeRequestData";
import { TableActions } from "./TableAction";
import { Icon } from "@iconify/react/dist/iconify.js";



export const EmployeeRequestColumn:ColumnDef<EmployeeRequestType>[] = [
    {
     accessorKey: "employeeId",
     header: "Id",
     cell: ({row}) => {
        return <p className="text-primary" >{row.getValue("employeeId")}</p>
     }
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "designation",
        header: "Position"
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "date",
        header: ({column}) => {
            return (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex cursor-pointer group hover:text-primary items-center gap-2" >
                 <span>Date</span>
                          <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
                </button>
            )
        },
        cell: ({row}) => {
            const realDate = new Date(row.getValue("date"));

          return <p>{realDate.toLocaleDateString()}</p>
        },
        sortingFn: (rowA , rowB) => {
           const dateA = new Date(rowA.getValue("date"));
           const dateB = new Date(rowB.getValue("date"));
           return dateA.getTime() - dateB.getTime()
        }
    },
    {
        accessorKey: 'leave' ,
        header: "Leave"
    },
    {
        accessorKey: "requestStatus",
        header: "Status",
        cell: ({row}) => {
            const isActive = row.getValue("requestStatus");
            const isApproved = row.original.isRequestApproved;
            if(isActive !== "pending"){
                if(isApproved){
                    return <span className="py-0.5 px-2 text-xs bg-primary/20 text-primary rounded-full" >Approved</span>
                }else{
                    return <span className="py-0.5 px-2 text-xs bg-red-500/20 text-red-500 rounded-full" >Rejected</span>
                }
              
            }else{
              return <span className="py-0.5 px-2 text-xs bg-yellow-500/20 text-yellow-500 rounded-full" >Pending</span>
            }
        }
    },
    {
        id: "Approval",
        header: "Approval Actions",
        cell: ({row}) => {
            const selectedRequest = row.original;
           return TableActions(selectedRequest)
        }
    }
]