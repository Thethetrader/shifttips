"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile, ContractType, ScheduleTemplate } from "@/lib/supabase/types";

const CONTRACT_TYPES: ContractType[] = ["CDI", "CDD", "Extra", "Apprenti"];

const WEEK_DAYS = [
  { key: "1", label: "Lun" },
  { key: "2", label: "Mar" },
  { key: "3", label: "Mer" },
  { key: "4", label: "Jeu" },
  { key: "5", label: "Ven" },
  { key: "6", label: "Sam" },
  { key: "7", label: "Dim" },
];

interface Props {
  profile: Profile | null;
  userId: string;
  email: string;
}

export default function SettingsView({ profile, userId, email }: Props) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [contractType, setContractType] = useState<ContractType>(profile?.contract_type || "CDI");
  const [weeklyHours, setWeeklyHours] = useState(profile?.weekly_hours?.toString() || "35");
  const [weeklyRestDays, setWeeklyRestDays] = useState(profile?.weekly_rest_days?.toString() || "2");
  const [scheduleTemplate, setScheduleTemplate] = useState<ScheduleTemplate>(profile?.schedule_template || {});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("profiles").upsert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      contract_type: contractType,
      weekly_hours: parseFloat(weeklyHours) || 35,
      weekly_rest_days: parseInt(weeklyRestDays) || 2,
      schedule_template: scheduleTemplate,
    });

    setSaving(false);
    if (error) { setError("Erreur lors de la sauvegarde."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-[100dvh] bg-cream px-4 pt-14 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mb-8"
      >
        <p className="text-xs text-ink-muted font-medium uppercase tracking-widest mb-1">Mon compte</p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Réglages</h1>
      </motion.div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Identity */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
          className="bg-white rounded-3xl p-5 border border-border/60 shadow-card"
        >
          <h2 className="text-sm font-semibold text-ink mb-4 uppercase tracking-widest">Identité</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-ink">Prénom</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Lucas"
                  className="h-12 bg-cream border-border rounded-xl text-ink"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-ink">Nom</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Martin"
                  className="h-12 bg-cream border-border rounded-xl text-ink"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-ink">Email</Label>
              <Input
                value={email}
                disabled
                className="h-12 bg-cream-dark border-border rounded-xl text-ink-muted cursor-not-allowed"
              />
            </div>
          </div>
        </motion.section>

        {/* Contract */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="bg-white rounded-3xl p-5 border border-border/60 shadow-card"
        >
          <h2 className="text-sm font-semibold text-ink mb-4 uppercase tracking-widest">Contrat</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-ink">Type de contrat</Label>
              <div className="grid grid-cols-2 gap-2">
                {CONTRACT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setContractType(type)}
                    className={`h-12 rounded-xl font-medium text-sm transition-all active:scale-95 ${
                      contractType === type
                        ? "bg-emerald text-white shadow-[0_4px_12px_rgba(15,81,50,0.25)]"
                        : "bg-cream border border-border text-ink-muted hover:border-emerald/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-ink">Heures / semaine</Label>
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    min="1"
                    max="80"
                    className="h-12 bg-cream border-border rounded-xl text-ink pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">h</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-ink">Repos / semaine</Label>
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={weeklyRestDays}
                    onChange={(e) => setWeeklyRestDays(e.target.value)}
                    min="0"
                    max="7"
                    className="h-12 bg-cream border-border rounded-xl text-ink pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">j</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Planning type */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
          className="bg-white rounded-3xl p-5 border border-border/60 shadow-card"
        >
          <h2 className="text-sm font-semibold text-ink mb-1 uppercase tracking-widest">Planning type</h2>
          <p className="text-xs text-ink-muted mb-4">Les heures sont pré-remplies à la saisie — modifiables à tout moment.</p>
          <div className="flex flex-col gap-3">
            {WEEK_DAYS.map(({ key, label }) => {
              const active = !!scheduleTemplate[key];
              return (
                <div key={key} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScheduleTemplate(prev => {
                        const next = { ...prev };
                        if (next[key]) { delete next[key]; }
                        else { next[key] = { start: "17:00", end: "23:30" }; }
                        return next;
                      });
                    }}
                    className={`flex items-center justify-between h-11 px-4 rounded-xl font-medium text-sm transition-all ${
                      active
                        ? "bg-emerald text-white"
                        : "bg-cream border border-border text-ink-muted"
                    }`}
                  >
                    <span>{label}</span>
                    {active && scheduleTemplate[key] && (
                      <span className="text-white/80 text-xs font-mono">
                        {scheduleTemplate[key].start} – {scheduleTemplate[key].end}
                      </span>
                    )}
                    {!active && <span className="text-ink-faint text-xs">Repos</span>}
                  </button>
                  {active && scheduleTemplate[key] && (
                    <div className="flex gap-2 px-1">
                      <div className="flex-1 flex flex-col gap-1">
                        <span className="text-[10px] text-ink-muted uppercase tracking-wider pl-1">Début</span>
                        <input
                          type="time"
                          value={scheduleTemplate[key].start}
                          onChange={e => setScheduleTemplate(prev => ({
                            ...prev,
                            [key]: { ...prev[key], start: e.target.value }
                          }))}
                          className="h-10 bg-cream border border-border rounded-xl text-ink text-sm px-3 focus:outline-none focus:border-emerald"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <span className="text-[10px] text-ink-muted uppercase tracking-wider pl-1">Fin</span>
                        <input
                          type="time"
                          value={scheduleTemplate[key].end}
                          onChange={e => setScheduleTemplate(prev => ({
                            ...prev,
                            [key]: { ...prev[key], end: e.target.value }
                          }))}
                          className="h-10 bg-cream border border-border rounded-xl text-ink text-sm px-3 focus:outline-none focus:border-emerald"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {error && (
          <p className="text-sm text-destructive bg-red-50 px-4 py-3 rounded-xl">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className={`h-14 font-semibold text-base rounded-2xl transition-all active:scale-[0.98] ${
            saved
              ? "bg-emerald-50 text-emerald border-2 border-emerald"
              : "bg-emerald text-white shadow-[0_8px_24px_rgba(15,81,50,0.25)] hover:bg-emerald-light"
          } disabled:opacity-60`}
        >
          {saved ? "Sauvegardé" : saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>

      {/* Sign out */}
      <div className="mt-8 pt-6 border-t border-border">
        <button
          onClick={handleSignOut}
          className="w-full h-12 text-destructive font-medium text-sm rounded-xl hover:bg-red-50 transition-colors"
        >
          Se déconnecter
        </button>
      </div>

      {/* App footer */}
      <div className="mt-6 pt-4 border-t border-border/50 flex flex-col items-center gap-3">
        <p className="text-xs text-ink-faint">ShiftTips · 100 % gratuit · v1.0</p>
        <div className="flex items-center gap-4 text-[11px] text-ink-faint">
          <a href="/confidentialite" className="hover:text-ink-muted transition-colors">Confidentialité</a>
          <span className="text-border">·</span>
          <a href="/cgu" className="hover:text-ink-muted transition-colors">CGU</a>
          <span className="text-border">·</span>
          <a href="/contact" className="hover:text-ink-muted transition-colors">Contact</a>
        </div>
      </div>
    </div>
  );
}
