
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import employee_1 from "@/assets/images/users/employee_1.jpg";
import employee_2 from "@/assets/images/users/employee_2.jpg";
import employee_3 from "@/assets/images/users/employee_3.jpg";
import employee_4 from "@/assets/images/users/employee_4.jpg";
import employee_5 from "@/assets/images/users/employee_5.jpg";


export default function UpcomingBirthday() {

    interface EmployeeBirthdaysType {
        id : string,
        employeeId: number,
        name: string,
        email: string,
        jobRole: string,
        img: string,
        date: string
    }

  const EmployeeBirthdays: EmployeeBirthdaysType[] = [
    {
        id : uuidv4(),
        employeeId: 2563,
        name: "Rakesh Chandra",
        email: "cyberrakesh036@gmail.com",
        jobRole: "WebApp Developer",
        img: employee_1,
        date: new Date().toLocaleDateString()
      },
      {
        id : uuidv4(),
        employeeId: 2567,
        name: "Taksahk Murmu",
        email: "cybertaksahkh036@gmail.com",
        jobRole: "Marketing Executive",
        img: employee_2,
        date: new Date().toLocaleDateString()
      },
      {
        id : uuidv4(),
        employeeId: 2569,
        name: "Lakshman Bediya",
        email: "cyberlakshman036@gmail.com",
        jobRole: "QA Engineer",
        img: employee_3,
        date: new Date().toLocaleDateString()
      },
      {
        id : uuidv4(),
        employeeId: 2569,
        name: "Alfredo Saris",
        email: "alfredo03@gmail.com",
        jobRole: "Graphic Designer",
        img: employee_4,
        date: new Date().toLocaleDateString()
      },
      {
        id : uuidv4(),
        employeeId: 2569,
        name: "Jakob Gouse",
        email: "jakobgrouse03@gmail.com",
        jobRole: "React Native Developer",
        img: employee_5,
        date: new Date().toLocaleDateString()
      },
  ];

  return (
    <Card className="gap-7">
        <h3 className="text-lg font-semibold text-start">Upcoming Birthdays</h3>
       
          <SimpleBar className="max-h-[290px]" >
             <div className="flex flex-col gap-4">
        {
          EmployeeBirthdays.map((employee) => (
            <div key={employee.id} className="flex items-start justify-between bg-gray-100 dark:bg-white/10 rounded-md p-3">
                <div className="flex items-center gap-2">
                    <img src={employee.img} alt="employee_image" className="rounded-md w-[60px] h-[47px] object-cover" />
                    <div className="flex flex-col gap-1">
                        <h5 className="leading-none text-sm text-dark font-medium">{employee.name}</h5>
                        <p className="text-sm text-muted">{employee.jobRole}</p>
                    </div>
                </div>
                <p className="text-xs text-muted">{employee.date}</p>
            </div>
          ))
        }
             </div>
        </SimpleBar>

    </Card>
  );
}
