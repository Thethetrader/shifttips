import type { Shift } from "@/lib/supabase/types";

// Mensualisation légale (Art. L3242-1 Code du travail) :
// heures mensuelles = heures hebdo × 52 / 12
// Valable pour tout contrat (CDI, CDD, extra, 20h, 35h, 39h, 42h…)
const WEEKS_PER_MONTH = 52 / 12;

export function monthlyContractHours(weeklyHours: number): number {
  return weeklyHours * WEEKS_PER_MONTH;
}

export function calcOvertimeHours(
  totalHoursWorked: number,
  weeklyContractHours: number,
): number {
  return Math.max(0, totalHoursWorked - monthlyContractHours(weeklyContractHours));
}

// Repos proportionnel aux semaines effectivement travaillées (Art. L3132-2 + Conv. HCR)
// weeksWorked = totalHoursWorked / weeklyContractHours
export function calcTheoreticalRestDays(
  weeklyRestDays: number,
  totalHoursWorked: number,
  weeklyContractHours: number,
): number {
  if (weeklyContractHours <= 0) return 0;
  const weeksWorked = totalHoursWorked / weeklyContractHours;
  return Math.round(weeksWorked * weeklyRestDays);
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
