
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTableProps<TData , TValue> {
    columns: ColumnDef<TData , TValue>[],
    data: TData[],
}

export function DataTable<TData , TValue>({
    columns,
    data
}:DataTableProps<TData , TValue>){

   const [columnFilters , setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        }
    });

    const [isSearchFocussed, setIsSearchFocussed] = useState(false);
    const [activeStatus , setActiveStatus] = useState("all");
  
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      table.getColumn("name")?.setFilterValue(e.target.value);
    };
    const handleSearchFocus = () => {
      setIsSearchFocussed(true);
    };
    const handleSearchBlur = () => {
      setIsSearchFocussed(false);
    }; 

    useEffect(() => {
         if(activeStatus === "active"){
            table.getColumn("status")?.setFilterValue("active");
         }else if(activeStatus === 'inactive') {
            table.getColumn("status")?.setFilterValue("inactive");
         }
        else{
            table.setColumnFilters([]);
        }
    },[activeStatus , table])

    return (
        <>
      <div className="flex items-center justify-between flex-wrap lg:gap-0 gap-2">
        <h3 className="text-lg font-semibold text-dark">Employee Status</h3>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild >
              <button className="py-2 px-3 flex items-center gap-2 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-primary hover:text-white cursor-pointer text-dark text-sm font-medium">
                <Icon icon="cuida:filter-outline" width={20} height={20} />
                Sort & Filter
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter & Sorting</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-sm text-dark font-medium">Employee Status</p>
                <Select value={activeStatus} onValueChange={(value:string) => setActiveStatus(value)} >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select employee status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DialogContent>
          </Dialog>
          <div
            className={`flex items-center border rounded-md px-3 flex-1 max-w-80 ${
              isSearchFocussed ? "border-primary " : "border-border"
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
              type="search"
              id="email"
              name="email"
              placeholder="Search..."
              className="max-w-80 h-9 bg-transparent dark:bg-transparent dark:text-white shadow-none border-none px-2"
            />
          </div>
        </div>
      </div>
        <div className="rounded-md border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                 {
                                   headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="first:px-4" >
                                            {
                                                header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext())
                                            }
                                        </TableHead>
                                    )
                                   })
                                 }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                      table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return  (
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
                            )
                        })
                      ) : null
                    }
                </TableBody>
            </Table>
        </div>
        </>
    )
}