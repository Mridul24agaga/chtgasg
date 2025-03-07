import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, handling conditional classes
 * and merging Tailwind CSS classes properly.
 *
 * @param inputs - Class values to be combined
 * @returns A string of combined class names
 *
 * Example:
 * cn("text-red-500", isActive && "bg-blue-500", isBold ? "font-bold" : "font-normal")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

