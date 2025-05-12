import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "./employeeData";

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
      accessorKey: "designation",
      header: "Job Role"
   },
   {
    accessorKey: "active",
    header: "Status",
    filterFn: "equals",
    cell : ({row}) => {
      const status:boolean = row.getValue("active");
      return (
         <>
          {
            status ?  <span className="py-0.5 px-2 rounded-md text-primary bg-primary/20 text-sm">Active</span> :  <span className="py-1 px-2 rounded-md text-gray-700 dark:text-white/70 bg-gray-200 dark:bg-white/20 text-sm">Inactive</span>
          }
         </>
      )
    }
   },
   {
    accessorKey: "department",
    header: "Department"
   },

]