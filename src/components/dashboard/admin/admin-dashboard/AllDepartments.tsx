
import {v4 as uuidv4} from "uuid";
import Department from "./Department";
import { useAllEmployeesQuery } from "@/store/api/employeeApi";
import { useEffect, useState } from "react";

export default function AllDepartments(){
  const {data} = useAllEmployeesQuery(undefined);
  const [allDepartments , setAllDepartments] = useState<any[]>();

  const departments = [
    {
      id: uuidv4(),
      icon: "solar:laptop-broken",
      employees: 9,
      department: "Engineering",
      bgColor: 'bg-purple/10',
      color: 'text-purple'
    },
    {
      id: uuidv4(),
      icon: "hugeicons:paint-board",
      employees: 12,
      department: "Design",
      bgColor: 'bg-primary/10',
      color: 'text-primary'
    },
    {
      id: uuidv4(),
      icon: "solar:shield-network-broken",
      employees: 6,
      bgColor: 'bg-warning/10',
      department: "Quality Assurance",
      color: 'text-warning'
    },
    {
      id: uuidv4(),
      icon: "solar:user-id-broken",
      employees: 16,
      bgColor: 'bg-error/10',
      department: "Sales",
      color: 'text-error'
    },
  ]

  useEffect(() => {
    if(data?.data){
      const allEmployees = data.data;
       const modifiedData = departments.map((item) => {
               const employees = allEmployees.filter((employee:any) => employee.department === item.department);
               return {...item , employees:employees.length}
       });
       setAllDepartments(modifiedData);
    }
  },[data])

    return (
        <>
          {
            allDepartments && allDepartments.map((department) => (
              <div key={department.id} className="lg:col-span-3 md:col-span-6 col-span-12">
              <Department icon={department.icon} department={department.department} employess= {department.employees} bgColor={department.bgColor} color={department.color} />
            </div>
            ))
          }
          </>
    )
}