import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "./employeeData"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppDispatch } from "@/hooks/hooks";
import { setDeletEmployeeDialog, setEditEmployeeDialog } from "@/store/slices/employeeTableSlice";
import { setSelectedEmployee } from "@/store/slices/employeeSlice";
import { EmployeeProfileAction } from "./employee-profile/EmployeeProfileAction";

const TableActions = (selectedEmployee:Employee) => {

  const dispatch = useAppDispatch();
  
return <div className="flex items-center gap-3">
      <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
      <button onClick={() => {
        dispatch(setEditEmployeeDialog(true));
        dispatch(setSelectedEmployee(selectedEmployee))
      }} >
      <Icon icon="solar:clapperboard-edit-broken" width={22} height={22} className="text-primary hover:text-primary/90 cursor-pointer" />
      </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit Employee</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger  asChild>
      <button onClick={() => {
        dispatch(setDeletEmployeeDialog(true));
        dispatch(setSelectedEmployee(selectedEmployee))
      }} >
      <Icon icon="solar:trash-bin-trash-broken" width={22} height={24} className="text-red-500 hover:text-red-400 cursor-pointer" />
      </button>
      </TooltipTrigger>
      <TooltipContent className="bg-red-500 fill-red-500" >
        <p>Delete Employee</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

    </div>
}

export const Employee_Columns:ColumnDef<Employee>[] = [
  {
    accessorKey: 'employeeId',
    header: "Id",
    cell: ({row}) => {
      const selectedEmployee = row.original;
      return EmployeeProfileAction(selectedEmployee)
    }
  },
  {
    accessorKey: 'name',
    header: ({column}) => {
      return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
         <span>Name</span>
         <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
      </button>
    },
    cell: ({row}) => {
      const selectedEmployee = row.original;
      return (
        <div className="flex items-center gap-2">
          {selectedEmployee.imageUrl ? <img src={selectedEmployee.imageUrl} className="size-8 rounded-full shrink-0" /> : <span className="size-8 flex items-center shrink-0 rounded-full justify-center font-medium bg-primary/10 text-primary">{selectedEmployee.name.charAt(0).toLocaleUpperCase()}</span>}
           <span className="text-sm font-medium text-dark dark:text-white" >{selectedEmployee.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'gender',
    header: "Gender"
  },
  {
    accessorKey: 'mobile_number',
    header: ({column}) => {
      return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
         <span>Mobile Number</span>
         <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
      </button>
    },
    sortingFn: (rowA,rowB) => {
      return Number(rowA.original.mobile_number) - Number(rowB.original.mobile_number)
    }
  },
  {
    accessorKey: 'aadhaar_number',
    header: ({column}) => {
      return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
         <span>Aadhaar Number</span>
         <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
      </button>
    },
    sortingFn: (rowA,rowB) => {
      return Number(rowA.original.aadhaar_number) - Number(rowB.original.aadhaar_number)
    }
  },
  // {
  //   accessorKey: 'account_number',
  //   header: ({column}) => {
  //     return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
  //        <span>Account Number</span>
  //        <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
  //     </button>
  //   },
  //   sortingFn: (rowA,rowB) => {
  //     return Number(rowA.original.account_number) - Number(rowB.original.account_number)
  //   }
  // },
  // {
  //   accessorKey: 'department',
  //   header: "Department",
  //   filterFn: (row , _columnId , filterValue) => {
  //       const department = row.getValue("department");
  //       if(filterValue !== "all"){
  //         return department === filterValue
  //       }else{
  //         return true
  //       }
  //   }
  // },
  {
    accessorKey: 'designation',
    header: "Designation"
  },
  // {
  //   accessorKey: 'salary',
  //   header: ({column}) => {
  //     return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
  //        <span>Salary</span>
  //        <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
  //     </button>
  //   },
  //   sortingFn: (rowA,rowB) => {
  //     return Number(rowA.original.salary) - Number(rowB.original.salary)
  //   },
  //   filterFn: (row, _columnId, filterValue) => {
  //      const salary = Number(row.original.salary);
  //      if(filterValue !== "all"){
  //       const startRange = Number(filterValue.split("-")[0]);
  //      const endRange = Number(filterValue.split("-")[1]);
  //      if(salary >= (startRange*1000) && salary <= (endRange*1000)){
  //       return true
  //      }else{
  //       return false
  //      }
  //      }else{
  //       return true
  //      }
  //   }
  // },
  // {
  //   accessorKey: 'current_address',
  //   header: "Current Address"
  // },
  // {
  //   accessorKey: 'permanent_address',
  //   header: "Permanent Address"
  // },
  // {
  //   accessorKey: 'employeeDOBDate',
  //   header: ({column}) => {
  //     return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
  //        <span>DOB</span>
  //        <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
  //     </button>
  //   },
  //   cell: ({row}) => {
  //     return <>{ (new Date(row.getValue("employeeDOBDate")).toLocaleDateString())}</>
  //   },
  //   sortingFn: (rowA , rowB) => {
  //     const dateA = new Date(rowA.original.employeeDOBDate);
  //     const dateB = new Date(rowB.original.employeeDOBDate);

  //   return dateA.getTime() - dateB.getTime(); 
  //   }
  // },
  {
    accessorKey: 'employeeJoiningDate',
    header: ({column}) => {
      return <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex group cursor-pointer hover:text-primary items-center gap-1">
         <span>Joining Date</span>
         <Icon icon="mi:sort" width={20} height={20} className="text-muted group-hover:text-primary" />
      </button>
    },
    cell: ({row}) => (
      <>{(new Date(row.getValue('employeeJoiningDate')).toLocaleDateString())}</>
    ),
    sortingFn: (rowA,rowB) => {
     const DateA = new Date(rowA.original.employeeJoiningDate);
     const DateB = new Date(rowB.original.employeeJoiningDate);

     return DateA.getTime() - DateB.getTime()
    }
  },
  {
    accessorKey: 'totalLeaves',
    header: "Consumed Leaves"
  },
  {
    accessorKey: 'casualLeaves',
    header: "Available Leaves",
    cell: ({row}) => {
      const selectedEmployee = row.original;
      return <p className="text-sm font-medium text-dark dark:text-white">{(selectedEmployee?.allottedLeaves ?? 0) - 
        (selectedEmployee?.totalLeaves ?? 0)}</p>
    }
  },
  {
    accessorKey: 'vacationLeaves',
    header: "Casual Leaves",
    cell: ({row}) => {
      const selectedEmployee = row.original;
      return <p className="text-sm font-medium text-dark dark:text-white">{(selectedEmployee?.vacationLeaves ?? 0) + 
        (selectedEmployee?.casualLeaves ?? 0)}</p>
    }
  },
  {
    accessorKey: 'sickLeaves',
    header: "Sick Leaves"
  },
  {
   accessorKey:"active",
   header:"Status",
   cell: ({row}) => {
      const isActive = row.getValue("active");
      if(isActive){
        return <span className="py-0.5 px-2 text-xs bg-success/20 text-success rounded-full" >Active</span>
      }else{
        return <span className="py-0.5 px-2 text-xs bg-gray-200 text-gray-400 rounded-full" >Inactive</span>
      }
   }
  },
  {
    id:"Actions",
    header:"Actions",
    cell: ({row}) => {
         const selectedEmployee = row.original;
         return TableActions(selectedEmployee)
    }
  },


]