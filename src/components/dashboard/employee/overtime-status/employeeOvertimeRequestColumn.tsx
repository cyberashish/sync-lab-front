import { ColumnDef } from "@tanstack/react-table";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDateDDMMYYYY } from "@/lib/utils";
import { format } from "date-fns";
import { EmployeeRequestType } from "../../admin/request-status/employeeRequestData";



export const EmployeeOvertimeRequestColumn:ColumnDef<EmployeeRequestType>[] = [
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
                 <span>Applied Date</span>
                          <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
                </button>
            )
        },
        cell: ({row}) => { 

          return <p>{formatDateDDMMYYYY(row.getValue("date"))}</p>
        },
        sortingFn: (rowA , rowB) => {
           const dateA = new Date(rowA.getValue("date"));
           const dateB = new Date(rowB.getValue("date"));
           return dateA.getTime() - dateB.getTime()
        }
    },
    {
        accessorKey: "overtimeDates",
        header: () => {
            return (
                <button className="flex cursor-pointer group hover:text-primary items-center gap-2" >
                 <span>Overtime Dates</span>
                </button>
            )
        },
        cell: ({row}) => { 
           const overtimeDates:any = row.getValue("overtimeDates")
          return <p className="text-sm"> {overtimeDates.map((ld:any) => format(new Date(ld.date), "do MMM"))
                                  .join(", ")}</p>
        },
    },
    {
        accessorKey: 'overtimeDays' ,
        header: "Overtime Days"
    },
    {
        accessorKey: "requestStatus",
        header: "Status",
        cell: ({row}) => {
            const isActive = row.getValue("requestStatus");
            const isApproved = row.original.isRequestApproved;
            if(isActive !== "pending"){
                if(isApproved){
                    return <span className="py-0.5 px-2 text-xs bg-success/20 text-success rounded-full" >Approved</span>
                }else{
                    return <span className="py-0.5 px-2 text-xs bg-red-500/20 text-red-500 rounded-full" >Rejected</span>
                }
              
            }else{
              return <span className="py-0.5 px-2 text-xs bg-yellow-500/20 text-yellow-500 rounded-full" >Pending</span>
            }
        }
    }
]