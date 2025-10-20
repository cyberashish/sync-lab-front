import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import profile_bg from "@/assets/images/background/profile_bg.jpg";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Building2,
  BookMarked,
} from "lucide-react";
import EmployeeMetric from "./EmployeeMetrics";

function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted lg:col-span-4 col-span-12">
      <div className="p-2 rounded-full bg-primary/10">{icon}</div>
      <span className="truncate">{label}</span>
    </div>
  );
}

interface EmployeeProfileProps {
  name: string;
  designation: string;
  department: string;
  dob: string;
  email: string;
  phone: string;
  location: string;
  joiningDate: string;
  avatarUrl?: string;
  bannerUrl?: any;
  active?: boolean;
  isLoading?: boolean;
}

export default function EmployeeProfile({
  name,
  designation,
  department,
  email,
  dob,
  phone,
  location,
  joiningDate,
  avatarUrl,
  bannerUrl = profile_bg,
  isLoading,
  active = true,
}: EmployeeProfileProps) {
  return (
    <Card className="w-full !p-0 rounded-2xl border border-gray-100 shadow-sm bg-white !gap-0">
      {/* Banner Section */}
      <div className="relative h-40 bg-gradient-to-b from-blue-100 to-white">
        <img
          src={bannerUrl}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Badge
          className={`absolute top-3 end-10 ${
            active
              ? "bg-success/10 text-success"
              : "bg-white/50 text-dark dark:text-white"
          } rounded-full`}
        >
          {active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Avatar */}
      <div className="relative flex flex-col items-center -mt-20">
        {isLoading ? (
          <div
            className="rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse size-40"
            aria-hidden
          />
        ) : avatarUrl ? (
          <Avatar className="size-40 border-3 border-white dark:border-border shadow-md">
            <img src={avatarUrl} alt={name} />
          </Avatar>
        ) : (
          <span className="size-40 border-3 border-white dark:border-border shadow-md bg-primary/20 text-primary font-semibold flex items-center justify-center rounded-full !text-7xl">
            {name.charAt(0).toLocaleUpperCase()}
          </span>
        )}
      </div>

      {/* Profile Info */}
      <CardContent className="mt-2 text-center space-y-1">
        <h2 className="text-lg font-semibold text-dark dark:text-white">
          {name}
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted">{designation}</p>
          <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
          </span>
          <p className="text-xs text-muted">{department}</p>
          </div>
        </div>
      </CardContent>

      {/* Details */}
      <div className="mt-5 border-t border-border">
        <div className="grid grid-cols-12 gap-4 flex-wrap px-6 py-5 text-sm text-gray-700">
          <InfoRow
            icon={<Mail className="h-4 w-4 text-primary" />}
            label={email}
          />
          <InfoRow
            icon={<Phone className="h-4 w-4 text-primary" />}
            label={phone}
          />
          <InfoRow
            icon={<MapPin className="h-4 w-4 text-primary" />}
            label={location}
          />
          <InfoRow
            icon={<CalendarDays className="h-4 w-4 text-primary" />}
            label={`Joined on ${new Date(joiningDate).toLocaleDateString()}`}
          />
          <InfoRow
            icon={<Building2 className="h-4 w-4 text-primary" />}
            label={`${department}`}
          />
          <InfoRow
            icon={<BookMarked className="h-4 w-4 text-primary" />}
            label={`DOB ${new Date(dob).toLocaleDateString()}`}
          />
        </div>
      </div>

      {/* Employee Metrics */}

      <EmployeeMetric />
    </Card>
  );
}
