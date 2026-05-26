import { createClient } from "@/lib/supabase/server";
import SettingsView from "@/components/app/SettingsView";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: workplaces }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user!.id).single(),
    supabase.from("workplaces").select("*").eq("user_id", user!.id).order("created_at"),
  ]);

  return <SettingsView profile={profile} userId={user!.id} workplaces={workplaces || []} />;
}
