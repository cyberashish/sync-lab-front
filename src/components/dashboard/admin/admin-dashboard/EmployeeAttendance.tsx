import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react/dist/iconify.js";
import {v4 as uuidv4} from "uuid";

export default function EmployeeAttendance() {
    const Employees = [
        {
            id: uuidv4(),
            employess: 40,
            status: "present",
            color: "primary",
            icon: "solar:user-plus-broken"
        },
        {
            id: uuidv4(),
            employess: 10,
            status: "absent",
            color: "warning",
            icon: "solar:user-minus-broken"
        },
        {
            id: uuidv4(),
            employess: 12,
            status: "leave",
            color: "error",
            icon: "solar:user-cross-broken"
        },
    ]
  return (
    <>
      {
        Employees.map((item) => (
            <div key={item.id} className="lg:col-span-4 col-span-12" >
                <Card>
            <CardContent>
              <div className="flex items-center gap-6">
                <span
                  className={`w-16 h-16 rounded-full bg-${item.color}/10 text-${item.color} flex items-center justify-center`}
                >
                  <Icon icon={item.icon} width={34} height={34} className="shrink-0" />
                </span>
                <div className="flex flex-col items-start">
                  <h6 className="text-lg text-dark dark:text-white font-bold">
                    {item.employess}
                  </h6>
                  <p className="text-base text-muted font-medium">
                    {item.status === "present" ? 'Total Present' : item.status === "absent" ? 'Total Absent' : item.status === "leave" ? 'Total on leave' : null}</p>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
        ))
      }
    </>
  );
}
