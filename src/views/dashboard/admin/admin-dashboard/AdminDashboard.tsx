import AllDepartments from "@/components/dashboard/admin/admin-dashboard/AllDepartments";
import EmployeeStatus from "@/components/dashboard/admin/admin-dashboard/employee-status/EmployeeStatus";
import EmployeeAttendance from "@/components/dashboard/admin/admin-dashboard/EmployeeAttendance";
import EmployeeSalary from "@/components/dashboard/admin/admin-dashboard/EmployeeSalary";
import TotalEmployess from "@/components/dashboard/admin/admin-dashboard/TotalEmployess";
import UpcomingBirthday from "@/components/dashboard/admin/admin-dashboard/UpcomingBirthday";
import UserBanner from "@/components/dashboard/admin/admin-dashboard/UserBanner";


export default function AdminDashboard(){

    return (
 
         <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-3 col-span-12">
              <UserBanner/>
            </div>
            <div className="lg:col-span-9 col-span-12">
                <div className="grid grid-cols-12 gap-6">
                <EmployeeAttendance/>
                 <div className="lg:col-span-4 col-span-12">
                 <TotalEmployess/>
                 </div>
                 <div className="lg:col-span-8 col-span-12 flex">
                    <EmployeeSalary/>
                 </div>
                </div>
            </div>
            <AllDepartments/>
            <div className="lg:col-span-8 col-span-12">
                <EmployeeStatus/>
            </div>
            <div className="lg:col-span-4 col-span-12">
                <UpcomingBirthday/>
            </div>
         </div>
    )
}