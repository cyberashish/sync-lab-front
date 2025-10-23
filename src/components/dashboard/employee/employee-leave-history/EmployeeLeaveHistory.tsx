import { Card } from "@/components/ui/card";
import EmployeeMetric from "../../admin/all-employees/employee-profile/EmployeeMetrics";



export default function EmployeeLeaveHistory(){

    return (
        <>
        <Card className="p-0">
            <div className="p-6 border-b border-border flex items-center lg:flex-nowrap gap-2 flex-wrap justify-between">
                <h5  className="text-lg font-semibold leading-none text-dark">Leave History</h5>
            </div>
            <EmployeeMetric isFull={true}/>
        </Card>
        </>
    )
}