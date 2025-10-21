
import { useAppSelector } from "@/hooks/hooks";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function LeaveChart() {

  const employee:any = useAppSelector((state) => state.employee);

  const [sickLeaves , setSickLeaves] = useState(0);
  const [casualLeaves , setCasualLeaves] = useState(0);
  const [vacationLeaves , setVacationLeaves] = useState(0);

    const theme = useAppSelector((state) => state.userMode.theme);

  const series = [sickLeaves ?? 0, casualLeaves ?? 0 , vacationLeaves ?? 0]
  const options:ApexOptions = {
    chart: {
      type: "donut",
      foreColor: theme === "light" ? "var(--color-dark)" : "#adb0bb" , 
    },
    labels: ["Sick", "Casual" , "Vacation"],
    colors: ["var(--color-warning)", "var(--color-error)" , "var(--color-success)"], 
    dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
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
                fontFamily: "inherit",
                fontWeight: 600,
                color: theme === "light" ? "var(--color-dark)" : "#ffffff",
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" },
        },
      },
    ],
  }

  useEffect(() => {
    if(employee){
      // console.log(employee , "Employee Leave");
       setSickLeaves(employee.sickLeaves);
       setCasualLeaves(employee.casualLeaves);
       setVacationLeaves(employee.vacationLeaves);
    }
  },[employee])
 
  return (
    <div key={theme}>
  <Chart key={ casualLeaves || sickLeaves || vacationLeaves} options={options} series={series} type="donut" width="100%" height="180px" />
    </div>
  );
}
