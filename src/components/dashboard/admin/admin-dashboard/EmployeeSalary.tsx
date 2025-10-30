import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { useAllEmployeesQuery } from "@/store/api/employeeApi";

export default function EmployeeSalary() {
  const theme = useAppSelector((state) => state.userMode.theme);
  const [leaveData, setLeaveData] = useState<any[]>([]);

  const { data: allEmployeeInfo } = useAllEmployeesQuery(undefined);

  useEffect(() => {
    if (allEmployeeInfo?.data?.length) {

      const grouped = allEmployeeInfo.data.reduce((acc: any, curr: any) => {
        if (!acc[curr.name]) {
          acc[curr.name] = 0;
        }
        acc[curr.name] += curr.totalLeaves || 0;
        return acc;
      }, {});

      const formatted = Object.entries(grouped).map(([name, totalLeaves]) => ({
        name,
        totalLeaves,
      }));

      setLeaveData(formatted);
    }
  }, [allEmployeeInfo]);

  const series = [
    {
      name: "Total Leaves",
      data: leaveData.map((emp) => emp.totalLeaves),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "inherit",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#3b82f6"],
    legend: { show: false },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 10,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: leaveData.map((emp) => emp.name),
      title: {
        text: "Employees",
        style: {
          color: theme === "light" ? "#111827" : "#ffffff",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: theme === "light" ? "#6b7280" : "#ffffffab",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: {
        text: "Total Leaves",
        style: {
          color: theme === "light" ? "#111827" : "#ffffff",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: theme === "light" ? "#6b7280" : "#ffffffab",
        },
      },
    },
    grid: {
      borderColor: theme === "light" ? "#e5e7eb" : "#374151",
      strokeDashArray: 5,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} leaves`,
      },
      theme: theme,
    },
  };

  return (
    <Card className="w-full pb-0">
      <h3 className="text-lg font-semibold text-start mb-2">
        Employee Total Leaves
      </h3>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="360px"
      />
    </Card>
  );
}
