import { Card } from "@/components/ui/card";

export default function AttendanceOverview(){
    return (
        <Card className="mt-6" >
            <div>
            <h3 className="text-lg text-dark font-semibold">Attendance Overview</h3>
             <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-success"></span>
                    <p className="text-sm text-muted font-medium">114 checked in today</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-warning"></span>
                    <p className="text-sm text-muted font-medium">6 late check-ins</p>
                </div>
             </div>
            </div>
        </Card>
    )
}