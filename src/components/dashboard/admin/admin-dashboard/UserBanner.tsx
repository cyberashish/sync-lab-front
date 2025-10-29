import { Card } from "@/components/ui/card";
import workBg from "@/assets/images/background/admin_work.png";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {v4 as uuidv4} from "uuid";
import { useAppSelector } from "@/hooks/hooks";
import { useGetAllEmployeesOvertimeRequestQuery, useGetAllEmployeesRequestQuery } from "@/store/api/employeeApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function UserBanner(){

   const userInfo = useAppSelector((state) => state.userMode.userInfo);
   const {data:LeaveRequests} = useGetAllEmployeesRequestQuery(undefined);
   const {data:OvertimeRequests} = useGetAllEmployeesOvertimeRequestQuery(undefined);
   const [pendingApprovals, setPendingApprovals] = useState(0);
   const [approvedApprovals, setApprovedApprovals] = useState(0);
   const [disApprovedApprovals, setDisApprovedApprovals] = useState(0);
   const [totalRequests , setTotalRequests] = useState(0);
    const tasks = [
        {
          id: uuidv4(),
          title: `${pendingApprovals} pending approvals`,
          icon: "solar:card-search-linear",
        },
        {
          id: uuidv4(),
          title: `${pendingApprovals} high-priority reviews`,
          icon: "bi:lightning-charge",
        },
        {
          id: uuidv4(),
          title: `${approvedApprovals} requests approved`,
          icon: "solar:calendar-broken",
        },
        {
          id: uuidv4(),
          title: `${totalRequests} reviewed, ${disApprovedApprovals} rejected`,
          icon: "solar:chart-2-broken",
        },
    ]

    useEffect(() => {
      if(LeaveRequests && OvertimeRequests){
         const pendingLeaveRequests = LeaveRequests.data.filter((item:any) => item.requestStatus === "pending");
         const pendingOvertimeRequests = OvertimeRequests.data.filter((item:any) => item.requestStatus === "pending");

         const approvedLeaveRequests = LeaveRequests.data.filter((item:any) => item.requestStatus === "Approved");
         const approvedOvertimeRequests = OvertimeRequests.data.filter((item:any) => item.requestStatus === "Approved");

         const disApprovedLeaveRequests = LeaveRequests.data.filter((item:any) => item.requestStatus === "Disapproved");
         const disApprovedOvertimeRequests = OvertimeRequests.data.filter((item:any) => item.requestStatus === "Disapproved");

         setPendingApprovals(pendingLeaveRequests.length + pendingOvertimeRequests.length);
         setApprovedApprovals(approvedLeaveRequests.length + approvedOvertimeRequests.length);
         setDisApprovedApprovals(disApprovedLeaveRequests.length + disApprovedOvertimeRequests.length);
         setTotalRequests(LeaveRequests.data.length + OvertimeRequests.data.length);

         console.log(LeaveRequests , OvertimeRequests)
      }
    },[LeaveRequests , OvertimeRequests])

    return (
        <Card className="p-0" >
            <img src={workBg} alt="bg" className="w-full" />
             <div className="flex flex-col gap-5 p-6 pt-0">
                <div className="flex flex-col gap-0">
                   <h4 className="text-center text-base font-bold uppercase">{`NAMASTE ${userInfo.name.split(" ")[0]}!`}</h4>
                   <h5 className="text-[15px] justify-center text-muted font-medium flex items-center gap-1">
                   Good Morning!
                   <Icon icon="solar:sun-bold-duotone" width={24} height={24} className="text-secondary" />
                   </h5>
                </div>
                <div className="flex flex-col gap-1.5">
                 {
                    tasks.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                    <Icon icon={item.icon} width={24} height={24} className="text-muted" />
                    <p className="text-sm text-dark/85 dark:text-white/85 font-medium">{item.title}</p>
                 </div>
                    ))
                 }
                </div>
                <Link to="/overtime-status" className="w-full" ><Button className="w-full" >Review it</Button></Link>
             </div>
        </Card>
    )
}