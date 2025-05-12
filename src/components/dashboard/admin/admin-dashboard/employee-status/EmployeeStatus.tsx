import { Card } from "@/components/ui/card";
import { columns } from "./columns";
import DataTable from "./DataTable";
import TableSkeleton from "@/components/shared/skeleton/TableSkeleton";
import { useAllEmployeesQuery } from "@/store/api/employeeApi";

export default function EmployeeStatus() {

  const {data , isLoading} = useAllEmployeesQuery(undefined);

  if(isLoading){
    return <TableSkeleton/>
  }
  return (
    <Card>
      <DataTable data={data.data.slice(0,5)} columns={columns} />
    </Card>
  );
}
