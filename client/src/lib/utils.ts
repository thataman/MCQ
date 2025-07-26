import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//generate a unique test ID 6 digit alphanumeric string

export const generateTestId = () => {
  return Math.random().toString(36).substring(2, 8);
}