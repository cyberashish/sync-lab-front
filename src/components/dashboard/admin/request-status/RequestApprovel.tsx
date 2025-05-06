import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { EmployeeRequestColumn } from "./employeeRequestColumn";
import ResolveRequestDialog from "./Dialog/ResolveRequestDialog";
import { useEffect, useMemo, useReducer, useState } from "react";
import { EmployeeRequestType } from "./employeeRequestData";
import { useAppSelector } from "@/hooks/hooks";
import DisapproveRequestDialog from "./Dialog/DisapproveRequestDialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@/components/ui/input";


interface initialStateType {
    isSearchFocussed:boolean,
    searchInput:string
}
const initialState = {
    isSearchFocussed:false,
    searchInput:""
}

export default function RequestApproval(){

    const searchInput  = "SEARCH_INPUT";
    const inputFocussed = "SEARCH_INPUT_FOCUSSED";

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
    const requestsStatus = useAppSelector((state) => state.requestStatus.requestStatusTableData);

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
        setEmployeeRequestData(requestsStatus);
    },[requestsStatus])

    const table = useReactTable({
        data: RequestsData,
        columns: EmployeeRequestColumn,
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
            <div className="p-6 border-b border-border flex items-center justify-between">
                <h5 className="text-lg font-semibold leading-none text-dark">Request Status</h5>
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
            <Table className="font-medium" >
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
            </Table>
            </div>
            </div>
        </Card>
        {/* Approve Request Dialog */}
        <ResolveRequestDialog/>
        {/* DisApprove Request Dialog */}
        <DisapproveRequestDialog/>
        </>
    )
}