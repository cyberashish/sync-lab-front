
import {v4 as uuidv4} from "uuid";
import Department from "./Department";

export default function AllDepartments(){
  const departments = [
    {
      id: uuidv4(),
      icon: "solar:laptop-broken",
      employees: 9,
      department: "Development",
      bgColor: 'bg-purple/10',
      color: 'text-purple'
    },
    {
      id: uuidv4(),
      icon: "solar:bug-broken",
      employees: 12,
      department: "QA Testing",
      bgColor: 'bg-primary/10',
      color: 'text-primary'
    },
    {
      id: uuidv4(),
      icon: "solar:shield-network-broken",
      employees: 6,
      bgColor: 'bg-warning/10',
      department: "Networking",
      color: 'text-warning'
    },
    {
      id: uuidv4(),
      icon: "solar:user-id-broken",
      employees: 16,
      bgColor: 'bg-error/10',
      department: "HR Team",
      color: 'text-error'
    },
  ]
    return (
        <>
          {
            departments.map((department) => (
              <div key={department.id} className="lg:col-span-3 md:col-span-6 col-span-12">
              <Department icon={department.icon} department={department.department} employess= {department.employees} bgColor={department.bgColor} color={department.color} />
            </div>
            ))
          }
          </>
    )
}