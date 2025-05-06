
// import { useAppSelector } from "@/hooks/hooks";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";

export default function TotalEmployess() {
  // const theme = useAppSelector((state) => state.themeMode.theme);

  type ChartDataType = {
    series: number[];
    options: ApexOptions;
  };

  const ChartData: ChartDataType = {
    series: [50, 28, 25, 7],
    options: {
      labels: ["Software", "UI/UX", "Mobile" , "Project"],
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

  const designations = [
    {
      id: uuidv4(),
      color: "bg-primary",
      designation: "Frontend Engineer",
      total: 50,
    },
    {
      id: uuidv4(),
      color: "bg-secondary",
      designation: "UI/UX Designer",
      total: 28,
    },
    {
      id: uuidv4(),
      color: "bg-darkwarning ",
      designation: "Mobile App Developer",
      total: 25,
    },
    {
      id: uuidv4(),
      color: "bg-accent",
      designation: "Project Manager",
      total: 7,
    },
  ];

  return (
    <Card className="gap-7">
        <h3 className="text-lg font-semibold text-start">Total Employees</h3>
      <div className="custom-chart">
      <Chart
        options={ChartData.options}
        series={ChartData.series}
        type="donut"
        width="100%"
        height="220px"
      />
      </div>
      <div className="flex flex-col gap-1 mt-0">
        {designations.map((item) => (
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
