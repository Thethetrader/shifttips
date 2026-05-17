import { createClient } from "@/lib/supabase/server";
import RecapView from "@/components/app/RecapView";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";

export default async function RecapPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const now = new Date();
  const firstDay = format(startOfMonth(now), "yyyy-MM-dd");
  const lastDay = format(endOfMonth(now), "yyyy-MM-dd");

  const prevMonth = subMonths(now, 1);
  const prevFirstDay = format(startOfMonth(prevMonth), "yyyy-MM-dd");
  const prevLastDay = format(endOfMonth(prevMonth), "yyyy-MM-dd");

  const [{ data: shifts }, { data: prevShifts }, { data: profile }] = await Promise.all([
    supabase.from("shifts").select("*").eq("user_id", user!.id).gte("shift_date", firstDay).lte("shift_date", lastDay),
    supabase.from("shifts").select("*").eq("user_id", user!.id).gte("shift_date", prevFirstDay).lte("shift_date", prevLastDay),
    supabase.from("profiles").select("weekly_hours, weekly_rest_days, contract_type").eq("id", user!.id).single(),
  ]);

  return (
    <RecapView
      shifts={shifts || []}
      prevShifts={prevShifts || []}
      profile={profile || { weekly_hours: 35, weekly_rest_days: 2, contract_type: null }}
      currentMonth={now}
    />
  );
}
