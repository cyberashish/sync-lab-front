import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day: number = date.getDate();
  const month: string = date.toLocaleString("default", { month: "long" });
  const year: number = date.getFullYear();

  const getDaySuffix = (d: number): string => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}

export function formatDateDDMMYYYY(dateString:string) {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
