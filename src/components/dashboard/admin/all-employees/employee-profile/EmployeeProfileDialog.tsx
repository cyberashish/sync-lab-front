
import { Dialog, DialogContent,  DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setEmployeeProfileImg, setProfileDialog } from "@/store/slices/employeeTableSlice";
import EmployeeProfile from "./EmployeeProfile";
import { useEffect } from "react";
import { useGetUserByEmailMutation } from "@/store/api/userApi";
 

export default function EmployeeProfileDialog(){
    const isDialogOpen = useAppSelector((state) => state.employeeTable.isProfileDialogOpen);
    const employeeProfileImg = useAppSelector((state) => state.employeeTable.employeeProfileImg);
    const dispatch = useAppDispatch();
    const employee = useAppSelector((state) => state.employee);
    // const [employeeProfileImg , setEmployeeProfileImg] = useState<any>(null);
    const [getUserByEmail , {isLoading}] = useGetUserByEmailMutation();
  
    async function handleUser(email:string){
      try{
        const result = await getUserByEmail({email});
        console.log(result,"User");
        dispatch(setEmployeeProfileImg(result.data.data.image));
      }catch(error){
        console.log("Failed to get user by email" , error)
      }
    }

    useEffect(() => {
      if(employee){
          handleUser(employee.email)
      }
    },[employee])

    return (
        <Dialog open={isDialogOpen} onOpenChange={(value) => dispatch(setProfileDialog(value))} >
        <DialogContent className="sm:max-w-3xl h-[calc(100vh_-_50px)] overflow-auto p-0 gap-0">
          <DialogHeader className="hidden">
            <DialogTitle className="hidden" >Edit profile</DialogTitle>
          </DialogHeader>
          <EmployeeProfile
        name={employee.name ?? 'employee'}
        designation={employee.designation ?? 'employee designation'}
        dob={employee.employeeDOBDate ?? '6745789845'}
        department={employee.department ?? 'employee department'}
        email={employee.email ?? 'employeeemail@gmail.com'}
        phone={employee.mobile_number ?? '9129856783'}
        location={employee.current_address}
        joiningDate={new Date(employee.employeeJoiningDate).toDateString()}
        avatarUrl={employeeProfileImg}
        isLoading={isLoading}
      />
        </DialogContent>
      </Dialog>
    )
}