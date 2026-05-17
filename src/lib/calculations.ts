import {
  getISOWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import type { Shift } from "@/lib/supabase/types";

export function getWeeksInMonth(year: number, month: number): number {
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(new Date(year, month, 1));
  const days = eachDayOfInterval({ start, end });
  const weeks = new Set(days.map((d) => getISOWeek(d)));
  return weeks.size;
}

export function calcOvertimeHours(
  totalHoursWorked: number,
  weeklyContractHours: number,
  year: number,
  month: number
): number {
  const weeks = getWeeksInMonth(year, month);
  const contractHoursForMonth = weeklyContractHours * weeks;
  return Math.max(0, totalHoursWorked - contractHoursForMonth);
}

export function calcTheoreticalRestDays(
  weeklyRestDays: number,
  year: number,
  month: number
): number {
  const weeks = getWeeksInMonth(year, month);
  return weeklyRestDays * weeks;
}

export function calcWorkedDays(shifts: Shift[]): number {
  return shifts.length;
}

export function calcTotalHours(shifts: Shift[]): number {
  return shifts.reduce((sum, s) => sum + (s.hours_worked || 0), 0);
}

export function calcTotalTips(shifts: Shift[]): number {
  return shifts.reduce((sum, s) => sum + (s.tips || 0), 0);
}

export function formatHours(h: number): string {
  const hours = Math.floor(h);
  const minutes = Math.round((h - hours) * 60);
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${String(minutes).padStart(2, "0")}`;
}

export function formatTips(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calcChangePercent(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

export function shiftsToDateMap(shifts: Shift[]): Map<string, Shift> {
  return new Map(shifts.map((s) => [s.shift_date, s]));
}
