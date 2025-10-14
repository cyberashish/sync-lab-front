import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import LeaveChart from "./LeaveChart";
import { useAppSelector } from "@/hooks/hooks";

export default function LeaveDetails() {


  const employee:any = useAppSelector((state) => state.employee);

  const metrics = [
    {
      id: "2",
      icon: "tdesign:undertake-delivery",
      metric: "Leaves Taken",
      amount: `${employee.totalLeaves ?? 0}`,
      color: "bg-primary/10 text-primary",
    },
    {
      id: "3",
      icon: "fluent:beach-28-regular",
      metric: "Casual Leaves",
      amount: `${employee.casualLeaves ?? 0}`,
      color: "bg-error/10 text-error",
    },
    {
      id: "4",
      icon: "solar:hospital-outline",
      metric: "Sick Leaves",
      amount: `${employee.sickLeaves ?? 0}`,
      color: "bg-warning/10 text-warning",
    },
    {
      id: "5",
      icon: "material-symbols-light:holiday-village-outline-rounded",
      metric: "Vacation Leaves",
      amount: `${employee.vacationLeaves ?? 0}`,
      color: "bg-success/10 text-success",
    },
  ];

  if (employee) {

    return (
      <>
        <Card className="p-0">
          <div>
            <div className="p-4 flex items-center justify-between border-b border-border">
              <h3 className="text-lg font-semibold">Leave Details</h3>
              <span className="flex items-center gap-1 text-sm text-dark dark:text-white border border-border rounded-sm px-3 py-1.5">
                <Icon icon="uil:calendar" width={16} height={16} />
                2025
              </span>
            </div>
            <div className="grid grid-cols-12 gap-0 p-6">
              <div className="lg:col-span-8 col-span-12 grid grid-cols-12 gap-2 gap-y-6">
                {metrics.map((item) => (
                  <div className="lg:col-span-6 col-span-12 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-1.5 text-base font-medium">
                      <span
                        className={`size-10 flex items-center justify-center rounded-full ${item.color} shrink-0`}
                      >
                        <Icon
                          icon={item.icon}
                          width={20}
                          height={20}
                          className="shrink-0"
                        />
                      </span>
                      {item.metric}
                    </div>
                    <h4 className="text-xl font-semibold ms-1">
                      {item.amount}
                    </h4>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-4 col-span-12">
                <LeaveChart />
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
