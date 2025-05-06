import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "./employeeData";
import { Icon } from "@iconify/react/dist/iconify.js";

export const columns: ColumnDef<Employee>[] = [
   {
    accessorKey: "employeeId",
    header: "ID",
    cell: ({row}) => {
      return <span className="text-sm font-medium text-primary underline" >{row.getValue("employeeId")}</span>
    }
   },
   {
    accessorKey: "name",
    header: "Name",
    filterFn:"includesString"
   },
   {
      accessorKey: "jobRole",
      header: "Job Role"
   },
   {
    accessorKey: "status",
    header: "Status",
    filterFn: "equals",
    cell : ({row}) => {
      const status:string = row.getValue("status");
      return (
         <>
          {
            status === "active" ?  <span className="py-0.5 px-2 rounded-md text-primary bg-primary/20 text-sm">{status}</span> :  <span className="py-1 px-2 rounded-md text-gray-700 dark:text-white/70 bg-gray-200 dark:bg-white/20 text-sm">{status}</span>
          }
         </>
      )
    }
   },
   {
    accessorKey: "TL",
    header: "TL"
   },
   {
      header: "View",
      cell: () => {
         return (
            <>
             <Icon icon="solar:eye-broken" className="hover:text-primary cursor-pointer" width={20} height={20} />
            </>
         )
      }
   }

]