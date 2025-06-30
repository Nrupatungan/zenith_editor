import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('');
}

function getOrdinal(n: number) {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

export function formatDateWithOrdinal(dateInput: string | number | Date) {
  const date = new Date(dateInput);
  const day = date.getDate();
  const ordinal = getOrdinal(day);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}${ordinal} ${year}`;
}