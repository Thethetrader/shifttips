import { createClient } from "@/lib/supabase/server";
import RecapView from "@/components/app/RecapView";
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, parse } from "date-fns";

export default async function RecapPage({ searchParams }: { searchParams: { month?: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const now = new Date();
  const currentMonth = searchParams.month
    ? parse(searchParams.month, "yyyy-MM", new Date())
    : now;

  const firstDay = format(startOfMonth(currentMonth), "yyyy-MM-dd");
  const lastDay = format(endOfMonth(currentMonth), "yyyy-MM-dd");

  const prevMonth = subMonths(currentMonth, 1);
  const prevFirstDay = format(startOfMonth(prevMonth), "yyyy-MM-dd");
  const prevLastDay = format(endOfMonth(prevMonth), "yyyy-MM-dd");

  const yearStart = format(startOfYear(currentMonth), "yyyy-MM-dd");

  const [{ data: shifts }, { data: prevShifts }, { data: ytdShifts }, { data: profile }, { data: workplaces }] = await Promise.all([
    supabase.from("shifts").select("*").eq("user_id", user!.id).gte("shift_date", firstDay).lte("shift_date", lastDay),
    supabase.from("shifts").select("*").eq("user_id", user!.id).gte("shift_date", prevFirstDay).lte("shift_date", prevLastDay),
    supabase.from("shifts").select("tips, workplace_id").eq("user_id", user!.id).gte("shift_date", yearStart).lte("shift_date", lastDay),
    supabase.from("profiles").select("weekly_hours, weekly_rest_days, contract_type, first_name, last_name").eq("id", user!.id).single(),
    supabase.from("workplaces").select("*").eq("user_id", user!.id).order("created_at"),
  ]);

  return (
    <RecapView
      shifts={shifts || []}
      prevShifts={prevShifts || []}
      ytdShifts={ytdShifts || []}
      profile={profile || { weekly_hours: 35, weekly_rest_days: 2, contract_type: null, first_name: null, last_name: null }}
      currentMonth={currentMonth}
      workplaces={workplaces || []}
    />
  );
}
