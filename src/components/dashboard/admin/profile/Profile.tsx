import { Card } from "@/components/ui/card";
import { useAllEmployeesQuery } from "@/store/api/employeeApi";
// import user from "@/assets/images/users/employee_2.jpg";
import {  useGetUserByTokenQuery } from "@/store/api/userApi";
import { useEffect, useState } from "react";
export default function Profile(){
  const [employee , setEmployee] = useState<any>(null);

  const {data:employees} = useAllEmployeesQuery(undefined);
  const {data:User} = useGetUserByTokenQuery(undefined);

  useEffect(() => {
    if(employees && User){
      const employee = employees.data.find((item:any) => item.email === User.data.email);
      console.log(employee)
      setEmployee(employee);
    }
  },[employees , User])
 
  if(employee){
    return ( 
        <Card className="max-w-md mx-auto" >
          <div className="flex items-center flex-col gap-3.5">
             <div className="w-36 h-36 rounded-full outline-3 outline-primary outline-offset-3 bg-lightprimary text-primary text-8xl font-medium flex items-center justify-center">
             {/* <img src={user} alt="profile_image"  className="rounded-full w-full" /> */}
              {employee.name.split("")[0].toLocaleUpperCase()}
             </div>
             <div className="flex flex-col gap-0.5 items-center">
               <h3 className="text-lg font-semibold text-dark leading-none">{employee.name}</h3>
               <p className="text-sm font-medium text-muted leading-none">{employee.email}</p>
             </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-12 col-span-12 rounded-xl">
                <h2 className="font-semibold mb-1 text-lg text-primary" >Professional Info</h2>
                 <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Designation:</h5>
                <p className="text-sm font-medium text-muted">{employee.designation}</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Joining Date:</h5>
                <p className="text-sm font-medium text-muted">{new Date(employee.employeeJoiningDate).toDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Department:</h5>
                <p className="text-sm font-medium text-muted">{employee.department}</p>
              </div>
                 </div>
            </div>
            <div className="lg:col-span-12 col-span-12 rounded-xl">
                <h2 className="font-semibold mb-1 text-lg text-primary" >Personal Info</h2>
                 <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">Gender:</h5>
                <p className="text-sm font-medium text-muted">{employee.gender}</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold">DOB:</h5>
                <p className="text-sm font-medium text-muted">{new Date(employee.employeeDOBDate).toDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <h5 className="text-base font-semibold whitespace-nowrap">Permanent Address:</h5>
                <p className="text-sm font-medium text-muted">{employee.permanent_address}</p>
              </div>
                 </div>
            </div>
          </div>
        </Card>
    )
  } else if(User?.data?.role === "admin"){
    return (
      <Card className="max-w-md mx-auto" >
    <div className="flex items-center flex-col gap-3.5">
       {
        User.data.image ? <img src={User.data.image} alt="profile_img" className="w-36 h-36 rounded-full outline-3 outline-primary outline-offset-3" /> : <div className="w-36 h-36 rounded-full outline-3 outline-primary outline-offset-3 bg-lightprimary text-primary text-8xl font-medium flex items-center justify-center">
        {User?.data?.fullname?.split("")[0].toLocaleUpperCase()}
       </div>
       }
       <div className="flex flex-col gap-0.5 items-center">
         <h3 className="text-lg font-semibold text-dark leading-none">{User?.data?.fullname}</h3>
         <p className="text-sm font-medium text-muted leading-none">{User?.data?.email}</p>
       </div>
    </div>
  </Card>
    )  
  }
}