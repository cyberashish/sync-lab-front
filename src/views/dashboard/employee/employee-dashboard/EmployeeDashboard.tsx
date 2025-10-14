import EmployeeInformation from "@/components/dashboard/employee/employee-information/EmployeeInformation";
import LeaveDetails from "@/components/dashboard/employee/leave-details/LeaveDetails";

export default function EmployeeDashboard(){

     return (
         <>
            <div className="grid grid-cols-12 gap-6">
                <div className="lg:col-span-6 col-span-12">
                    <EmployeeInformation/>
                </div>
                <div className="lg:col-span-6 col-span-12">
                     <LeaveDetails/>
                </div>
            </div>
         </>
     )
} 