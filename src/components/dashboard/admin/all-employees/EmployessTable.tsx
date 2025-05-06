import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { Employee } from "./employeeData"
import { Employee_Columns } from "./columns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import EditEmployee from "./EditEmployee"
import { useAppSelector } from "@/hooks/hooks"
import DeleteEmployee from "./DeleteEmployee"
import { Button } from "@/components/ui/button"

export default function EmployeesTable({searchInput , salaryRange , activeDepartment}:{searchInput:string , salaryRange:string , activeDepartment:string}) {
    const[sorting , setSorting] = useState<SortingState>([]);
    const [employeeInfo , setEmployeInfo] = useState<Employee[]>([]);
     const[columnFilters , setColumnFilters] = useState<ColumnFiltersState>([]);
     const [pagination , setPagination] = useState({
      pageIndex:0,
      pageSize:8
     })
     const EmployeesData = useAppSelector((state) => state.employeeTable.employees);
     useMemo(() => {
      return employeeInfo
  },[employeeInfo]);

  useEffect(() => {
    setEmployeInfo(EmployeesData)
  },[EmployeesData]);

    const table = useReactTable({
        data:employeeInfo,
        columns:Employee_Columns,
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state:{
         sorting,
         columnFilters,
         pagination
        },
    });



    useEffect(() => {
      table.getColumn("name")?.setFilterValue(searchInput);
      table.getColumn("salary")?.setFilterValue(salaryRange);
      table.getColumn("department")?.setFilterValue(activeDepartment)
    },[searchInput , salaryRange , activeDepartment ])
    return (
      <>
      <div className="m-6 mb-0">
        <div className="rounded-md border border-border overflow-hidden" >
         <Table >
            <TableHeader>
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
                          {
                            headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="first:px-4 font-semibold" >
                                  {
                                    header.isPlaceholder ? null : flexRender(header.column.columnDef.header , header.getContext())
                                  }
                                </TableHead>
                            ))
                          }
                        </TableRow>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="first:px-4 font-medium" >
                              {flexRender(cell.column.columnDef.cell , cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                    )) : null
                }
            </TableBody>
         </Table>
        </div>
        </div>
        <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          className="!h-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="!h-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
        {/* Edit Employee Dialog */}
         <EditEmployee />
         {/* Delete Employee Dialog */}
         <DeleteEmployee/>
      </>
    )
}