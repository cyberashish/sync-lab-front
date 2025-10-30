"use client";

import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { useAllHolidaysQuery } from "@/store/api/employeeApi";
import { CalendarDays, Loader2 } from "lucide-react";
import { format } from "date-fns";
// import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import DeleteHolidayDialog from "./DeleteHolidayDialog";

export default function HolidayList() {
  const { data: holidayInfo, isLoading, isError } = useAllHolidaysQuery(undefined);
  // const [deleteHoliday] = useDeleteHolidayMutation();
  const [isDialogOpen , setIsDialogOpen] = useState(false);
  const [selectedHoliday , setSelectedHoliday] = useState<any>(null);
  // const [deletingId, setDeletingId] = useState<string | null>(null);

  // async function handleDelete(id: string) {
  //   if (confirm("Are you sure you want to delete this holiday?")) {
  //     try {
  //       await deleteHoliday({ id });
  //       await refetch();
  //     } catch (error) {
  //       console.error("Error deleting holiday:", error);
  //       alert("Failed to delete holiday!");
  //     }
  //   }
  // }

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
    <div className="max-w-2xl mx-auto p-4">
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
{/* Delete icon with Tooltip */}


  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger  asChild>
      <button onClick={() => {
        setIsDialogOpen(true);
        setSelectedHoliday(holiday);
      }} >
      <Icon icon="solar:trash-bin-trash-broken" width={22} height={24} className="text-red-500 hover:text-red-400 cursor-pointer" />
      </button>
      </TooltipTrigger>
      <TooltipContent className="bg-red-500 fill-red-500" >
        <p>Delete Holiday</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
      <DeleteHolidayDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} selectedHoliday={selectedHoliday} />
    </div>

  );
}
