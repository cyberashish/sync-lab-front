import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/hooks";

export default function EmployeeSalary(){

  const theme = useAppSelector((state) => state.userMode.theme);

    const series = [{
        name: 'Total Salary',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },];
    const options:ApexOptions = {
        chart: {
            type: 'bar',
            fontFamily: 'inherit',
            height: 350,
            toolbar: {
                show: false 
            },
          },
          colors: ['var(--color-primary)'],
          legend:{
            show:false
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              borderRadius: 10,
              borderRadiusApplication: 'around',
              dataLabels: {
                position: 'top',
                total: {
                  enabled: false,
                  formatter: undefined,
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                    color: '#ffffff',
                    fontSize: '12px',
                    fontFamily: undefined,
                    fontWeight: 600
                  }
                }
            }
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                    colors: `${theme === "light" ? 'var(--color-muted)' : '#ffffffab'}`
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            title: {
                text: '$ (thousands)',
                style: {
                    color: `${theme === "light" ? 'var(--color-dark)' : '#ffffff'}` 
                }
            },
            tickAmount: 8,
            min: 0,
            max: 80,
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                    colors: `${theme === "light" ? 'var(--color-muted)' : '#ffffffab'}` 
                },
            }
        },
        
          fill: {
            opacity: 1
          },
          grid: {
            show: true,
            borderColor: `${theme === "light" ? 'var(--color-border)' : 'var(--color-darkborder)'}`,
            strokeDashArray: 5
          },
          tooltip: {
            y: {
              formatter: function (val:number) {
                return "$ " + val + " thousands"
              }
            },
            theme: theme
          }
    }
    return (
        <Card className="w-full pb-0" >
          <h3 className="text-lg font-semibold text-start">Employee Salary</h3>  
         <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height="360px"
         />
        </Card>
    )
}