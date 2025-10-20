import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function EmployeeMetric(){
    interface allMetricType {
        id:string,
        title:string,
        subtitle:string,
        icon:string,
        color:string,
        value:number
    }
      const employee:any = useAppSelector((state) => state.employee);
    const allMetrics: allMetricType[] = [
        {
            id:"1",
            title:"Allotted Leaves",
            subtitle:"Leaves allotted to you",
            icon:"solar:calendar-linear",
            color:"bg-primary/10 text-primary",
            value:employee.allottedLeaves??0
        },
        {
            id:"2", 
            title:"Available Leaves",
            subtitle:"Your available leaves",
            icon:"tdesign:undertake-delivery",
            color:"bg-success/10 text-success",
            value: employee.allottedLeaves ? (employee.allottedLeaves - employee.totalLeaves) : 0
        },
        {
            id:"3",
            title:"Consumed Leaves",
            subtitle:"Your all taken leaves",
            icon:"ri:progress-3-line",
            color:"bg-warning/10 text-warning",
            value: employee.totalLeaves ?? 0
        },
        {
            id:"4",
            title:"Overtime",
            subtitle:"Additional working days",
            icon:"lsicon:overtime-filled",
            color:"bg-error/10 text-error",
            value: employee.overtimeDays ?? 0
        },
    ]
    return (
        <div className="grid grid-cols-12 gap-6">
          {
            allMetrics.map((item:allMetricType) => (
                <div className="lg:col-span-3 col-span-12" key={item.id}>
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-dark">{item.title}</h3>
                      <p className="text-sm text-muted">{item.subtitle}</p>
                      </div>
                      <span className={`size-12 rounded-full ${item.color} flex items-center justify-center`}>
                            <Icon icon={item.icon} width={28} height={28} className="shrink-0" />
                        </span>
                    </div>
                    <div className="flex flex-col items-start mt-2">
                            <h6 className="text-2xl text-dark dark:text-white font-semibold">{item.value}</h6>
                        </div>
                  </CardContent>
                </Card>        
            </div>
            ))
          }
        </div>
    )
}