
import { Card } from "@/components/ui/card";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Suspense, useEffect, useState } from "react";
import { useAllEmployeesQuery } from "@/store/api/employeeApi";
import { Item } from "@radix-ui/react-dropdown-menu";
import BirthdaySkeleton from "@/components/shared/skeleton/BirthdaySkeleton";


export default function UpcomingBirthday() {


  const [employeesBirthdays , setEmployeesBirthdays] = useState<any[]>([]);

  const {data , isLoading} = useAllEmployeesQuery(undefined);

  useEffect(() => {
     if(data){
      const employees = data.data;
       const modifiedData = [...employees].sort((a,b) => {
         const aBirthday = new Date(a.employeeDOBDate);
         const bBirthday = new Date(b.employeeDOBDate);
         return aBirthday.getMonth() - bBirthday.getMonth();
       });
       const currrentMonth = new Date().getMonth();
       const upcomingBirthdays = modifiedData.filter((item) => {
          const employeeDOBMonth = new Date(item.employeeDOBDate).getMonth();
           if(employeeDOBMonth >= currrentMonth){
              return Item
           }
       });
       setEmployeesBirthdays(upcomingBirthdays);
     }
  },[data])

  return (
    <Suspense fallback={<>Loading...</>} >
    <Card className="gap-7">
        <h3 className="text-lg font-semibold text-start">Upcoming Birthdays</h3>
       
          <SimpleBar className="max-h-[290px]" >
             <div className="flex flex-col gap-4">
        {
          isLoading ? <BirthdaySkeleton/> :
          employeesBirthdays.map((employee) => (
            <div key={employee.id} className="flex items-start justify-between bg-gray-100 dark:bg-white/10 rounded-md p-3">
                <div className="flex items-center gap-2">
                    {/* <img src={employee.img} alt="employee_image" className="rounded-md w-[60px] h-[47px] object-cover" /> */}
                    <span className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center" >
                      {employee.name.split("")[0].toLocaleUpperCase()}
                    </span>
                    <div className="flex flex-col gap-1">
                        <h5 className="leading-none text-sm text-dark font-medium">{employee.name}</h5>
                        <p className="text-sm text-muted">{employee.designation}</p>
                    </div>
                </div>
                <p className="text-xs text-muted">{new Date(employee.employeeDOBDate).toLocaleDateString()}</p>
            </div>
          ))
        }
             </div>
        </SimpleBar>

    </Card>
  </Suspense>
  );
}
