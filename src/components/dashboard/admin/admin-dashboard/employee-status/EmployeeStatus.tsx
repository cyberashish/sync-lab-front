import { Card } from "@/components/ui/card";
import { DataTable } from "./DataTable";
import { employees } from "./employeeData";
import { columns } from "./columns";



export default function EmployeeStatus() {
  return (
    <Card>
      {/* <TestTable/> */}
      <DataTable data={employees} columns={columns} />
    </Card>
  );
}
