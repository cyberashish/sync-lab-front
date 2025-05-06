
import EmployeesTable from "@/components/dashboard/admin/all-employees/EmployessTable";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useReducer } from "react";

interface initialStateType {
  searchInput: string,
  activeDepartment: string ,
  isSearchFocussed: boolean,
  salaryRange: string
}

const initialState:initialStateType = {
  searchInput: "",
  activeDepartment: "all" ,
  isSearchFocussed: false,
  salaryRange: "all",
}

const searchAction = "SEARCH_INPUT";
const selectAction = "ACTIVE_STATUS";
const searchFocussedAction = "IS_SEARCH_FOCUSSED";
const salaryRangeAction = "SALARY_RANGE";


export default function AllEmployees() {

  function reducer(state:initialStateType,action:{type:string , payload:any}){
     switch(action.type){
      case searchAction:
      return {...state , searchInput: action.payload};
      break;
      case selectAction:
      return {...state , activeDepartment: action.payload};
      break;
      case searchFocussedAction:
      return {...state ,isSearchFocussed: action.payload };
      break;
      case salaryRangeAction:
      return {...state , salaryRange: action.payload }
      default:
      return state
     }
  }

  const [state , dispatch] = useReducer(reducer , initialState);

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type:searchAction , payload: e.target.value})
  }

  const handleSearchFocus = () => {
    dispatch({type: searchFocussedAction , payload:true})
  }

  const handleSearchBlur = () => {
    dispatch({type: searchFocussedAction , payload:false})
  }

  return (
    <>
      <Card className="p-0 gap-0">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark leading-none">
            All Employess Information
          </h3>
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
                  Please apply your desired changes to the table.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-sm text-dark font-medium">Department</p>
                <Select value={state.activeDepartment} onValueChange={(value:string) => dispatch({type:selectAction , payload:value})} >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select employee status" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Quality Assurance">
                        Quality Assurance (QA)
                      </SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <p className="text-sm text-dark font-medium">Employee Salary</p>
                <RadioGroup value={state.salaryRange} onValueChange={(value) => dispatch({type:salaryRangeAction , payload:value}) } className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={'0-50'} id="firstRange" />
                    <Label htmlFor="firstRange">0 - 50k</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={'50-100'} id="secondRange" />
                    <Label htmlFor="secondRange">50k - 100k</Label>
                  </div>
                </RadioGroup>
              </div>

            </DialogContent>
          </Dialog>
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
        </div>
        <EmployeesTable searchInput={state.searchInput} salaryRange={state.salaryRange} activeDepartment={state.activeDepartment} />
      </Card>
    </>
  );
}
