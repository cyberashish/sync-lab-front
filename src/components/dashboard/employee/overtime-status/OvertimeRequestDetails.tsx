import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useReducer, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@/components/ui/input";
import TableSkeleton from "@/components/shared/skeleton/TableSkeleton";
import { EmployeeRequestType } from "../../admin/request-status/employeeRequestData";
import { useGetEmployeeOvertimeRequestsMutation } from "@/store/api/employeeApi";
import { useAppSelector } from "@/hooks/hooks";
import { EmployeeOvertimeRequestColumn } from "./employeeOvertimeRequestColumn";


interface initialStateType {
    isSearchFocussed:boolean,
    searchInput:string
}
const initialState = {
    isSearchFocussed:false,
    searchInput:""
}

export default function OvertimeRequestDetails(){

    const searchInput  = "SEARCH_INPUT";
    const inputFocussed = "SEARCH_INPUT_FOCUSSED";
    const [data , setData] = useState<any[]>([]);

    const reducer = ( state:initialStateType , action:{type:string , payload:any}) => {
       switch(action.type){
        case searchInput : 
        return {...state , searchInput : action.payload};
        break;
        case inputFocussed : 
        return {...state , isSearchFocussed: action.payload};
        break;
        default:
        return state
       }
    }
 
    const [state , dispatch] = useReducer(reducer, initialState)
    const [EmployeeRequestData , setEmployeeRequestData] = useState<EmployeeRequestType[]>([]);
    const [getEmployeeOvertimeRequestInfo , {isLoading}] = useGetEmployeeOvertimeRequestsMutation();
    const employee = useAppSelector((state) => state.employee);

    

    const handleSearchFocus = () => {
       dispatch({type:inputFocussed , payload:true})
    }
    const handleSearchBlur = () => {
       dispatch({type:inputFocussed , payload:false})
    }

    const RequestsData = useMemo(() => {
        return [...EmployeeRequestData]
    },[EmployeeRequestData])

    useEffect(() => {
        if(data){
            setEmployeeRequestData(data);
        }
    },[data])

    async function handleRequest(email: string) {
      try {
        const result = await getEmployeeOvertimeRequestInfo({ email });
        setData(result.data.data.overtimes);
      } catch (error) {
        console.log("Failed to fetch overtime requests!", error);
      }
    }

    useEffect(() => {
       if(employee){
          handleRequest(employee.email)
       }
    },[employee])

    const table = useReactTable({
        data: RequestsData,
        columns: EmployeeOvertimeRequestColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type:searchInput , payload:e.target.value});
        table.getColumn("name")?.setFilterValue(e.target.value)
   }


    return (
        <>
        <Card className="p-0">
            <div className="p-6 border-b border-border flex items-center lg:flex-nowrap gap-2 flex-wrap justify-between">
                <h5  className="text-lg font-semibold leading-none text-dark">Overtime Request Status</h5>
                <div
            className={`flex items-center border rounded-md px-3 flex-1 max-w-80 ${
              state.isSearchFocussed ? "border-primary " : "border-border"
            }`}
          >
            <Icon
              icon="si:search-line"
              width={20}
              height={20}
              className="shrink-0 text-dark"
            />
            <Input
              onBlur={handleSearchBlur}
              onFocus={handleSearchFocus}
              onChange={handleSearch}
              value={state.searchInput}
              type="search"
              id="email"
              name="email"
              placeholder="Search by name..."
              className="max-w-80 h-9 bg-transparent dark:bg-transparent dark:text-white shadow-none border-none px-2"
            />
               </div>
            </div>
            <div className="p-6 pt-0">
            <div className="rounded-md border border-border overflow-hidden" >
            {isLoading ? <TableSkeleton/> : <Table className="font-medium" >
                <TableHeader>
                    {
                      table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} >
                            {
                                headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="first:px-4" >
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
                                {
                                    row.getVisibleCells().map((cell) => (
                                       <TableCell key={cell.id} className="first:px-4" >
                                         {
                                            flexRender(cell.column.columnDef.cell , cell.getContext())
                                         }
                                       </TableCell>
                                    ))
                                }
                            </TableRow>
                        )) : null
                    }
                </TableBody>
            </Table>}
            </div>
            </div>
        </Card>
        </>
    )
}