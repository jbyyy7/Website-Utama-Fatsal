import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function generateRegistrationNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9000) + 1000
  return `PPDB-${year}-${random}`
}
