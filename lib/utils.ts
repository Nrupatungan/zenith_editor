import { TransformType } from "@/validators/transformations.validator";
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

export function buildParams(values: TransformType): string[]{
  const {width, height, padding_color, aspect_ratio, focus, crop_strategy} = values;
  const params: string[] = [];

  if (width) {
    params.push(`w-${width}`);
  }
  if (height) {
    params.push(`h-${height}`);
  }

  if (aspect_ratio) {
    params.push(`ar-${aspect_ratio}`);
  }

  if (crop_strategy) {
    if (crop_strategy === "cm-pad_extract" || crop_strategy === "cm-pad_resize") {
      params.push(crop_strategy);
      // Ensure padding_color is valid before adding
      if (padding_color) {
          params.push(`bg-${padding_color.slice(1).toUpperCase()}`);
      }
    } else {
      params.push(crop_strategy);
    }
  }

  if(focus){
    if(crop_strategy !== 'c-force' && crop_strategy !== 'c-at_max' && crop_strategy !== "c-at_max_enlarge" && crop_strategy !== "cm-pad_extract"){
      params.push(focus)
    }
  }

  return params;
}