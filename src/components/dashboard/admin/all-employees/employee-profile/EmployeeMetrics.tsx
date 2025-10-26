import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";
import { useLazyGetEmployeeDetailsQuery } from "@/store/api/employeeApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

export default function EmployeeMetric({isFull=false}:any) {
  interface allMetricType {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    value: number;
  }
  const employee: any = useAppSelector((state) => state.employee);
  const [timelines , setTimelines] = useState<any[]>([]);
  const [activeYear , setActiveYear] = useState("");
  const [activeEmployeeMetric, setActiveEmployeeMetric] = useState<any>(null);
  const [allLeaveRequests , setAllLeaveRequests] = useState<any[]>([]);
  const [allOvertimeRequests , setAllOvertimeRequests] = useState<any[]>([]);
  const [allLeaveChangelogs , setAllLeaveChangelogs] = useState<any[]>([]);


  const [fetchEmployee] = useLazyGetEmployeeDetailsQuery();

  const allMetrics: allMetricType[] = [
    {
      id: "1",
      title: "Allotted Leaves",
      subtitle: "Leaves allotted to you",
      icon: "solar:calendar-linear",
      color: "bg-primary/10 text-primary",
      value: activeEmployeeMetric?.allottedLeaves ?? 0,
    },
    {
      id: "2",
      title: "Available Leaves",
      subtitle: "Your available leaves",
      icon: "tdesign:undertake-delivery",
      color: "bg-success/10 text-success",
      value:  activeEmployeeMetric?.availableLeaves ?? 0,
    },
    {
      id: "3",
      title: "Consumed Leaves",
      subtitle: "Your all taken leaves",
      icon: "ri:progress-3-line",
      color: "bg-warning/10 text-warning",
      value: activeEmployeeMetric?.consumedLeaves ?? 0,
    },
    {
      id: "4",
      title: "Overtime",
      subtitle: "Additional working days",
      icon: "lsicon:overtime-filled",
      color: "bg-error/10 text-error",
      value:  activeEmployeeMetric?.overtime ?? 0,
    },
  ];

  function getLatestLog(logs:any) {
    if (!Array.isArray(logs) || logs.length === 0) return null;
  
    return logs.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt)
        ? current
        : latest;
    }, logs[0]); 
  }
  

   function groupByCreatedYearArray(data: any[]) {
    const grouped = data.reduce((acc, item) => {
      const year = new Date(item.createdAt).getFullYear();
  
      if (!acc[year]) {
        acc[year] = [];
      }
  
      acc[year].push(item);
      return acc;
    }, {} as Record<number, any[]>);
  
    return Object.entries(grouped).map(([year, requests]) => ({
      year: Number(year),
      requests,
    }));
  }
  

  async function handleEmployeeDetails(employeeId:string){
      try{
        const employeeData = await fetchEmployee({id:employeeId});
        const leaveRequests = groupByCreatedYearArray(employeeData.data.data.requests) ;
        const allOvertimeRequests = groupByCreatedYearArray(employeeData.data.data.overtimes);
        const allLeaveChangelogs = groupByCreatedYearArray(employeeData.data.data.leaveChangeLogs);
        
        const timelines = leaveRequests.map((item) => item.year.toString());
        setAllLeaveRequests(leaveRequests);
        setAllOvertimeRequests(allOvertimeRequests);
        setAllLeaveChangelogs(allLeaveChangelogs);
        setTimelines(timelines.length ? timelines : [new Date().getFullYear().toString()]);
        setActiveYear(timelines.length ? timelines[0] : new Date().getFullYear().toString());
      }catch(error){
        console.log("Failed to get employee details" , error)
      }
  }
  useEffect(() => {
    if(employee){
        handleEmployeeDetails(employee.id);
    }
  },[employee]);

  useEffect(() => {
     if(activeYear && allLeaveRequests){
       const activeRequest = allLeaveRequests.find((item) => item.year.toString() == activeYear) ?? [];
       const activeOvertimeRequests = allOvertimeRequests.find((item) => item.year.toString() == activeYear) ?? [];
       const activeLeaveChangeLogs = allLeaveChangelogs.find((item) => item.year.toString() == activeYear) ?? [];
       console.log(activeOvertimeRequests);
       console.log(activeRequest);
       const takenLeaves = activeRequest
       ? activeRequest?.requests?.reduce(
           (acc: number, item: any) => acc + (item.isRequestApproved ? item.leave ?? 0 : 0),
           0
         )
       : 0;
       const overtime = activeOvertimeRequests
       ? activeOvertimeRequests?.requests?.reduce(
           (acc: number, item: any) => acc + (item.isRequestApproved ? item.overtimeDays : 0),
           0
         )
       : 0;
       const latestLeaveLog = getLatestLog(activeLeaveChangeLogs?.requests);
       setActiveEmployeeMetric({
        allottedLeaves:latestLeaveLog?.newLeaves ?? 18,
        availableLeaves:((latestLeaveLog?.newLeaves ?? 18) - (takenLeaves ?? 0)),
        consumedLeaves: takenLeaves,
        overtime
       })
       console.log(takenLeaves , activeRequest);
     }
  },[activeYear])
  return (
    <div className={`flex flex-col gap-4 items-center p-6 ${isFull ? 'p-6 pt-0' : 'p-6'}`}>
         <div className="flex items-center gap-1 rounded-md p-1 bg-gray-200 dark:bg-white/20">
            {
              timelines.map((item,index) => <button onClick={() => setActiveYear(item)} key={index} className={`py-2 px-3 rounded-md text-sm font-medium text-dark cursor-pointer ${activeYear === item ? 'bg-primary text-white' : 'bg-white dark:bg-black dark:text-white'}`}>Year {item}</button>)
            }
         </div>
      <div className="grid grid-cols-12 gap-6 w-full">
        {allMetrics.map((item: allMetricType) => (
          <div className={`${isFull ? 'lg:col-span-3' : 'lg:col-span-6'} col-span-12`} key={item.id}>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-dark">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted">{item.subtitle}</p>
                  </div>
                  <span
                    className={`size-12 rounded-full ${item.color} flex items-center justify-center`}
                  >
                    <Icon
                      icon={item.icon}
                      width={28}
                      height={28}
                      className="shrink-0"
                    />
                  </span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <h6 className="text-2xl text-dark dark:text-white font-semibold">
                    {item.value}
                  </h6>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
