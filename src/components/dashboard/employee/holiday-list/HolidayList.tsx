"use client";

import { Card } from "@/components/ui/card";
import { useAllHolidaysQuery } from "@/store/api/employeeApi";
import { CalendarDays, Loader2 } from "lucide-react";
import { format } from "date-fns";


export default function HolidayList() {
  const { data: holidayInfo, isLoading, isError } = useAllHolidaysQuery(undefined);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
      </div>
    );
  }

  if (isError || !holidayInfo?.data || holidayInfo?.data?.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        No holidays found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
        Corporate Holiday List ({new Date().getFullYear()})
      </h2>

      <Card>
        <ul className="divide-y divide-border">
          {holidayInfo.data.map((holiday: any) => {
            // Format all holiday dates
            const formattedDates = holiday.holidayDates
              .map((d: string) => format(new Date(d), "do MMM yyyy"))
              .join(", ");

            return (
              <li
                key={holiday.id}
                className="flex items-center justify-between py-3 flex-wrap lg:gap-0 gap-2"
              >
                {/* Left section */}
                <div className="flex items-center space-x-3">
                  <CalendarDays className="w-5 h-5 text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-gray-800 dark:text-white font-medium">
                      {holiday.name}
                    </span>
                    <span className="text-muted text-sm">{formattedDates}</span>
                  </div>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {holiday.totalDays} {holiday.totalDays > 1 ? "days" : "day"}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      holiday.type === "Public"
                        ? "bg-green-100 text-green-800 dark:text-success dark:bg-success/10"
                        : holiday.type === "Company"
                        ? "bg-primary/10 text-primary"
                        : "bg-yellow-100 text-yellow-800 dark:text-warning dark:bg-warning/10"
                    }`}
                  >
                    {holiday.type}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>

  );
}
