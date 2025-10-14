"use client";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { formatDate } from "@/lib/utils";
import { useGetEmployeeMutation } from "@/store/api/employeeApi";
import { useGetUserByTokenQuery } from "@/store/api/userApi";
import { setSelectedEmployee } from "@/store/slices/employeeSlice";
import { Edit3 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import employeeBg from "@/assets/images/background/employee.png";

export default function EmployeeInformation() {
  const [trigger] = useGetEmployeeMutation();
  const { data } = useGetUserByTokenQuery(undefined);

  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.employee);

  async function handleGetEmployee(email: string) {
    const employeeData = await trigger({ email: email });
    console.log(employeeData, "Employee");
    dispatch(setSelectedEmployee(employeeData.data.data));
  }

  useEffect(() => {
    if (data) {
      if (data?.data?.role !== "admin") {
        handleGetEmployee(data?.data?.email);
      }
    }
  }, [data]);

  if (employee) {
    return (
      <Card className="p-0">
        <div>
          <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-3 rounded-t-xl">
            <div className="flex items-center gap-3">
              {data?.data?.image ? (
                <img
                  src={data?.data?.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
              ) : (
                <span className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-medium">
                  {data?.data?.fullname.split("")[0].toUpperCase()}
                </span>
              )}

              <div>
                <h2 className="font-semibold text-lg leading-tight">
                  {employee?.name}
                </h2>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  {employee?.designation}
                  <span className="text-orange-500 text-xs">●</span>
                  {employee?.department}
                </p>
              </div>
            </div>
            <Link to="/my-profile">
              <button className="bg-white/20 cursor-pointer text-white p-2 rounded-full hover:bg-primary hover:text-white transition">
                <Edit3 size={16} />
              </button>
            </Link>
          </div>
          <div className="px-5 py-4 relative">
             <div className="space-y-4 text-sm lg:col-span-7 col-span-12">
             <div>
              <p className="text-xs text-gray-500 uppercase">Phone Number</p>
              <p className="font-medium">{employee.mobile_number}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Email Address</p>
              <p className="font-medium break-all">{employee?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Report Office</p>
              <p className="font-medium">
                {employee?.reportOffice ?? "Ahmedabad"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Joined on</p>
              <p className="font-medium">
                {formatDate(employee.employeeJoiningDate)}
              </p>
            </div>
             </div>
             <img src={employeeBg} alt="employee_image" className="absolute -top-6 end-6 lg:w-5/12" />
          </div>
        </div>
      </Card>
    );
  }
}
