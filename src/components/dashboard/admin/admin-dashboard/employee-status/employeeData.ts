import {v4 as uuidv4} from "uuid";

export interface Employee {
    id: string,
    employeeId: number,
    name: string,
    status: string,
    department: string,
    jobRole:string,
    email: string,
    TL : string   
}

export const employees:Employee[] = [
    {
      id : uuidv4(),
      employeeId: 2563,
      name: "Rakesh Chandra",
      status: "active",
      department: "Development",
      email: "cyberrakesh036@gmail.com",
      jobRole: "WebApp Developer",
      TL: "Swiden V."
    },
    {
      id : uuidv4(),
      employeeId: 2567,
      name: "Taksahk Murmu",
      status: "active",
      department: "Marketing",
      email: "cybertaksahkh036@gmail.com",
      jobRole: "Marketing Executive",
      TL: "Kadin V."
    },
    {
      id : uuidv4(),
      employeeId: 2569,
      name: "Lakshman Bediya",
      status: "inactive",
      department: "QA Testing",
      email: "cyberlakshman036@gmail.com",
      jobRole: "QA Engineer",
      TL: "Talan T."
    },
    {
      id : uuidv4(),
      employeeId: 2569,
      name: "Alfredo Saris",
      status: "inactive",
      department: "UI/UX Designer",
      email: "alfredo03@gmail.com",
      jobRole: "Graphic Designer",
      TL: "Kaiya F."
    },
    {
      id : uuidv4(),
      employeeId: 2569,
      name: "Jakob Gouse",
      status: "active",
      department: "Mobile App Developer",
      email: "jakobgrouse03@gmail.com",
      jobRole: "React Native Developer",
      TL: "Ashish K."
    },
]