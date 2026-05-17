"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Shift } from "@/lib/supabase/types";

interface Props {
  date: Date;
  existingShift?: Shift;
  userId: string;
  onSaved: (shift: Shift) => void;
  onDeleted: (date: string) => void;
  onClose: () => void;
}

function timeToDecimal(time: string): number {
  if (!time) return 0;
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

export default function ShiftModal({ date, existingShift, userId, onSaved, onDeleted, onClose }: Props) {
  const [startTime, setStartTime] = useState(existingShift?.start_time?.slice(0, 5) || "09:00");
  const [endTime, setEndTime] = useState(existingShift?.end_time?.slice(0, 5) || "17:00");
  const [tips, setTips] = useState(existingShift?.tips?.toString() || "");
  const [note, setNote] = useState(existingShift?.note || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dateStr = format(date, "yyyy-MM-dd");
  const displayDate = format(date, "EEEE d MMMM", { locale: fr });

  const hoursWorked = Math.max(0, timeToDecimal(endTime) - timeToDecimal(startTime));

  async function handleSave() {
    if (hoursWorked <= 0) {
      setError("L'heure de fin doit être après l'heure de début.");
      return;
    }
    setError(null);
    setSaving(true);

    const supabase = createClient();
    const payload = {
      user_id: userId,
      shift_date: dateStr,
      start_time: startTime + ":00",
      end_time: endTime + ":00",
      hours_worked: hoursWorked,
      tips: parseFloat(tips) || 0,
      note: note || null,
    };

    const { data, error } = await supabase
      .from("shifts")
      .upsert(payload, { onConflict: "user_id,shift_date" })
      .select()
      .single();

    setSaving(false);
    if (error) { setError("Erreur lors de l'enregistrement."); return; }
    if (data) onSaved(data as Shift);
  }

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("shifts").delete().eq("user_id", userId).eq("shift_date", dateStr);
    setDeleting(false);
    onDeleted(dateStr);
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-[2rem] pb-safe"
        style={{ maxHeight: "92dvh", overflowY: "auto" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        <div className="px-5 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-ink tracking-tight capitalize">
                {displayDate}
              </h2>
              <p className="text-sm text-ink-muted mt-0.5">
                {existingShift ? "Modifier le service" : "Saisir le service"}
              </p>
            </div>
            {existingShift && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs text-destructive font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors min-h-[44px]"
              >
                {deleting ? "…" : "Supprimer"}
              </button>
            )}
          </div>

          {/* Hours — visual display */}
          <div className="bg-white rounded-2xl px-5 py-4 mb-5 border border-border/60 shadow-card">
            <p className="text-xs text-ink-muted mb-3 uppercase tracking-widest font-medium">
              Durée calculée
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-ink font-mono tracking-tight">
                {Math.floor(hoursWorked)}
              </span>
              <span className="text-lg text-ink-muted font-mono">h</span>
              <span className="text-4xl font-bold text-ink font-mono tracking-tight">
                {String(Math.round((hoursWorked % 1) * 60)).padStart(2, "0")}
              </span>
              <span className="text-lg text-ink-muted font-mono">min</span>
            </div>
          </div>

          <div className="flex gap-3 mb-5">
            <div className="flex-1 flex flex-col gap-2">
              <Label className="text-sm font-medium text-ink">Début</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="h-12 bg-white border-border rounded-xl text-ink text-base focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label className="text-sm font-medium text-ink">Fin</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="h-12 bg-white border-border rounded-xl text-ink text-base focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <Label className="text-sm font-medium text-ink">Pourboires (€)</Label>
            <div className="relative">
              <Input
                type="number"
                inputMode="decimal"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                placeholder="0"
                min="0"
                step="0.5"
                className="h-12 bg-white border-border rounded-xl text-ink text-base pl-8 focus:border-emerald focus:ring-2 focus:ring-emerald/20"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted font-medium">€</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <Label className="text-sm font-medium text-ink">Note <span className="text-ink-faint font-normal">(optionnel)</span></Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Service tranquille, bonne table du 12…"
              rows={2}
              className="bg-white border-border rounded-xl text-ink resize-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive bg-red-50 px-4 py-3 rounded-xl mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-14 bg-emerald text-white font-semibold text-base rounded-2xl transition-all active:scale-[0.98] active:-translate-y-px disabled:opacity-60 shadow-[0_8px_24px_rgba(15,81,50,0.25)] hover:bg-emerald-light"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </motion.div>
    </>
  );
}
