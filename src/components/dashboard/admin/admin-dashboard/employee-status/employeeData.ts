import {v4 as uuidv4} from "uuid";

export interface Employee {
    id: string,
    employeeId: number,
    name: string,
    active: boolean,
    department: string,
    designation:string,
    email: string,
    TL : string   
}

export const employees:Employee[] = [
    {
      id : uuidv4(),
      employeeId: 2563,
      name: "Rakesh Chandra",
      active: true,
      department: "Development",
      email: "cyberrakesh036@gmail.com",
      designation: "WebApp Developer",
      TL: "Swiden V."
    },
    {
      id : uuidv4(),
      employeeId: 2567,
      name: "Taksahk Murmu",
      active: true,
      department: "Marketing",
      email: "cybertaksahkh036@gmail.com",
      designation: "Marketing Executive",
      TL: "Kadin V."
    },
    {
      id : uuidv4(),
      employeeId: 2569,
      name: "Lakshman Bediya",
      active: false,
      department: "QA Testing",
      email: "cyberlakshman036@gmail.com",
      designation: "QA Engineer",
      TL: "Talan T."
    },
    {
      id : uuidv4(),
      employeeId: 2569,
      name: "Alfredo Saris",
      active: false,
      department: "UI/UX Designer",
      email: "alfredo03@gmail.com",
      designation: "Graphic Designer",
      TL: "Kaiya F."
    },
    {
      id : uuidv4(),
      employeeId: 2569,
      name: "Jakob Gouse",
      active: true,
      department: "Mobile App Developer",
      email: "jakobgrouse03@gmail.com",
      designation: "React Native Developer",
      TL: "Ashish K."
    },
]