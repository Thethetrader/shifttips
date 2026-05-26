import { createClient } from "@/lib/supabase/server";
import CalendarView from "@/components/app/CalendarView";
import { format } from "date-fns";

export default async function AppPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = format(new Date(year, month, 1), "yyyy-MM-dd");
  const lastDay = format(new Date(year, month + 1, 0), "yyyy-MM-dd");

  const [{ data: shifts }, { data: profile }, { data: workplaces }] = await Promise.all([
    supabase.from("shifts").select("*").eq("user_id", user!.id).gte("shift_date", firstDay).lte("shift_date", lastDay),
    supabase.from("profiles").select("first_name").eq("id", user!.id).maybeSingle(),
    supabase.from("workplaces").select("*").eq("user_id", user!.id).order("created_at"),
  ]);

  return (
    <CalendarView
      initialShifts={shifts || []}
      userId={user!.id}
      firstName={(profile as { first_name: string | null } | null)?.first_name || null}
      workplaces={workplaces || []}
    />
  );
}
