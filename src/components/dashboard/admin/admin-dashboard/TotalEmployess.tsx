
// import { useAppSelector } from "@/hooks/hooks";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import { useAllEmployeesQuery } from "@/store/api/employeeApi";
import { useEffect, useState } from "react";
import { ChartSkeleton } from "@/components/shared/skeleton/ChartSkeleton";

// const initialState = {
//   engineers: 0,
//   designers: 0,
//   sales: 0,
//   qualityAssurance:0
// }

// const enginnersActionType = "ENGINEERS"; 
// const designActionType = "DESIGN"; 
// const salesActionType = "SALES"; 
// const qualityAssuranceActionType = "QUALITY ASSURANCE"; 

// function reducer (state:any,action:any) {
//   switch(action.type){
//     case enginnersActionType: 
//     return {...state, engineers:action.payload};
//     break;
//     case designActionType: 
//     return {...state , designers:action.payload};
//     break;
//     case salesActionType: 
//     return {...state, sales:action.payload};
//     break;
//     case qualityAssuranceActionType:
//     return {...state , qualityAssurance:action.payload};
//     break;
//     default: 
//     return state
//   }
// }

export default function TotalEmployess() {

  const {data , isLoading} = useAllEmployeesQuery(undefined);
  // const [state , dispatch] = useReducer(reducer , initialState);
  const [departmentCountByEmployees , setDepartmentCountByEmployees] = useState<any[]>([]);
  const departments = ["Engineering" , "Design" , "Quality Assurance" , "Sales"];
  const [employeesBasedOnDepartments , setEmployeesBasedOnDepartments] = useState<any[]>([]);

  const designations = [
    {
      id: uuidv4(),
      color: "bg-primary",
      designation: "Engineering",
      total: 50,
    },
    {
      id: uuidv4(),
      color: "bg-secondary",
      designation: "Design",
      total: 28,
    },
    {
      id: uuidv4(),
      color: "bg-darkwarning ",
      designation: "Quality Assurance",
      total: 25,
    },
    {
      id: uuidv4(),
      color: "bg-accent",
      designation: "Sales",
      total: 7,
    },
  ];

  function handleEmployees(employees:any){
     const departmentCouts:any = [];

     departments.forEach((department:string) => {
      const employeeByDepartment = employees.filter((employee:any) => {
        return employee.department === department
      });
      departmentCouts.unshift(employeeByDepartment.length)
     });

     setDepartmentCountByEmployees(departmentCouts);

  }

  useEffect(() => {
    if(data){
      handleEmployees(data.data);
      const modifiedData = designations.map((employee) => {
        const filteredData = data.data.filter((value:any) => value.department === employee.designation);
        return {...employee , total: filteredData.length}
      });
      setEmployeesBasedOnDepartments(modifiedData);
    }
  },[data])




  type ChartDataType = {
    series: number[];
    options: ApexOptions;
  };

  const ChartData: ChartDataType = {
    series: departmentCountByEmployees,
    options: {
      labels: ["Design" , "Engineering " , "Sales" , "QA"],
      chart: {
        height: 190,
        type: "donut",
        fontFamily: "inherit",
        foreColor: "#adb0bb",
      },
      stroke: {
        show: true,
        colors: ['var(--color-muted)'],
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      colors: [
        "var(--color-primary)",
        "var(--color-secondary)",
        "var(--color-darkwarning)",
        "var(--color-accent)",
      ],

      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: false,
                label: "Total",
                fontSize: "19px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#373d3f",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce(
                    (a: number, b: number) => {
                      return a + b;
                    },
                    0
                  );
                },
              },
            },
          },
        },
      },

      tooltip: {
        theme: "dark",
        fillSeriesColor: false,
      },
    },
  };



  return (
    <Card className="gap-7">
        <h3 className="text-lg font-semibold text-start">Total Employees</h3>
      <div className="custom-chart">
      {
        isLoading?<ChartSkeleton/>:<Chart
        key={JSON.stringify(ChartData)}
        options={ChartData.options}
        series={departmentCountByEmployees}
        type="donut"
        width="100%"
        height="220px"
      />
      }
      </div>
      <div className="flex flex-col gap-1 mt-0">
        {employeesBasedOnDepartments && employeesBasedOnDepartments.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${item.color}`}></span>
              <p className="text-[15px] text-dark/85 dark:text-white/85 font-medium">{item.designation}</p>
            </div>
            <p className="text-sm text-dark font-medium">{item.total}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
