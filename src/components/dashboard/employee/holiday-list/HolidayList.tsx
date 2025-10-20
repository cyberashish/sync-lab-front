import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

type Holiday = {
  name: string;
  date: string;
  type: "Public Holiday" | "Optional" | "Company Holiday";
};

const holidays: Holiday[] = [
  { name: "Republic Day", date: "26 Jan 2026", type: "Public Holiday" },
  { name: "Holi", date: "13 Mar 2026", type: "Public Holiday" },
  { name: "Good Friday", date: "3 Apr 2026", type: "Public Holiday" },
  { name: "Independence Day", date: "15 Aug 2026", type: "Public Holiday" },
  { name: "Diwali", date: "1 Nov 2026", type: "Public Holiday" },
  { name: "Christmas", date: "25 Dec 2026", type: "Public Holiday" },
  { name: "Company Retreat", date: "20 Dec 2026", type: "Company Holiday" },
];

export default function HolidayList() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">Corporate Holiday List 2026</h2>
     <Card>
      <ul className="divide-y divide-border">
        {holidays.map((holiday) => (
          <li key={holiday.name} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <CalendarDays className="w-5 h-5 text-indigo-500" />
              <span className="text-gray-800 dark:text-white font-medium">{holiday.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted text-sm">{holiday.date}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  holiday.type === "Public Holiday"
                    ? "bg-green-100 text-green-800 dark:text-success dark:bg-success/10"
                    : holiday.type === "Company Holiday"
                    ? "bg-primary/10 text-primary"
                    : "bg-yellow-100 text-yellow-800 dark:text-warning dark:bg-warning/10"
                }`}
              >
                {holiday.type}
              </span>
            </div>
          </li>
        ))}
      </ul>
      </Card>
    </div>
  );
}
