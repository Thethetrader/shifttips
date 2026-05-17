"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import ShiftModal from "@/components/app/ShiftModal";
import type { Shift } from "@/lib/supabase/types";
import { shiftsToDateMap, formatTips } from "@/lib/calculations";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface Props {
  initialShifts: Shift[];
  userId: string;
  firstName: string | null;
}

export default function CalendarView({ initialShifts, userId, firstName }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const shiftMap = shiftsToDateMap(shifts);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday-first offset
  const startOffset = (getDay(monthStart) + 6) % 7;

  async function loadShifts(date: Date) {
    setLoading(true);
    const supabase = createClient();
    const firstDay = format(startOfMonth(date), "yyyy-MM-dd");
    const lastDay = format(endOfMonth(date), "yyyy-MM-dd");
    const { data } = await supabase
      .from("shifts")
      .select("*")
      .eq("user_id", userId)
      .gte("shift_date", firstDay)
      .lte("shift_date", lastDay);
    setShifts(data || []);
    setLoading(false);
  }

  function prevMonth() {
    const d = subMonths(currentDate, 1);
    setCurrentDate(d);
    loadShifts(d);
  }

  function nextMonth() {
    const d = addMonths(currentDate, 1);
    setCurrentDate(d);
    loadShifts(d);
  }

  function openDay(day: Date) {
    setSelectedDate(day);
    setModalOpen(true);
  }

  const handleShiftSaved = useCallback((shift: Shift) => {
    setShifts((prev) => {
      const exists = prev.findIndex((s) => s.shift_date === shift.shift_date);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = shift;
        return updated;
      }
      return [...prev, shift];
    });
    setModalOpen(false);
  }, []);

  const handleShiftDeleted = useCallback((date: string) => {
    setShifts((prev) => prev.filter((s) => s.shift_date !== date));
    setModalOpen(false);
  }, []);

  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const selectedShift = selectedDateStr ? shiftMap.get(selectedDateStr) : undefined;

  const totalTips = shifts.reduce((sum, s) => sum + (s.tips || 0), 0);
  const totalHours = shifts.reduce((sum, s) => sum + (s.hours_worked || 0), 0);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-cream">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 bg-cream sticky top-0 z-10">
        <div className="flex items-center justify-between mb-1">
          <div>
            {firstName && (
              <p className="text-xs text-ink-muted font-medium uppercase tracking-widest mb-1">
                Bonjour, {firstName}
              </p>
            )}
            <h1 className="text-2xl font-semibold tracking-tight text-ink capitalize">
              {format(currentDate, "MMMM yyyy", { locale: fr })}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-ink-muted hover:bg-cream-dark transition-colors active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-ink-muted hover:bg-cream-dark transition-colors active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 mt-3">
          <div className="flex-1 bg-white rounded-2xl px-4 py-3 shadow-card">
            <p className="text-xs text-ink-muted mb-0.5">Heures</p>
            <p className="text-lg font-semibold text-ink font-mono">
              {totalHours.toFixed(1).replace(".", "h")}
            </p>
          </div>
          <div className="flex-1 bg-emerald rounded-2xl px-4 py-3 shadow-card">
            <p className="text-xs text-white/70 mb-0.5">Pourboires</p>
            <p className="text-lg font-semibold text-white font-mono">
              {formatTips(totalTips)}
            </p>
          </div>
          <div className="flex-1 bg-white rounded-2xl px-4 py-3 shadow-card">
            <p className="text-xs text-ink-muted mb-0.5">Services</p>
            <p className="text-lg font-semibold text-ink font-mono">{shifts.length}</p>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="px-4 pb-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[11px] font-medium text-ink-faint uppercase tracking-wider py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="grid grid-cols-7 gap-1.5"
        >
          {/* Empty cells for offset */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const shift = shiftMap.get(dateStr);
            const today = isToday(day);

            return (
              <button
                key={dateStr}
                onClick={() => openDay(day)}
                className={`
                  relative flex flex-col items-center justify-start pt-2 pb-1.5 rounded-2xl min-h-[60px]
                  transition-all duration-150 active:scale-95
                  ${shift ? "bg-emerald-50 border border-emerald-200/60" : "bg-white border border-border/60"}
                  ${today ? "ring-2 ring-emerald/30" : ""}
                `}
              >
                <span
                  className={`
                    text-sm font-semibold leading-none mb-1
                    ${today ? "text-emerald" : shift ? "text-emerald-700" : "text-ink"}
                  `}
                >
                  {format(day, "d")}
                </span>

                {shift && (
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    {shift.tips > 0 && (
                      <span className="text-[9px] font-semibold text-emerald leading-none font-mono">
                        {shift.tips}€
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* FAB — saisir aujourd'hui */}
      <button
        onClick={() => openDay(new Date())}
        className="fixed bottom-24 right-4 z-30 w-14 h-14 bg-emerald text-white rounded-2xl shadow-[0_8px_24px_rgba(15,81,50,0.35)] flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Saisir le service du jour"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedDate && (
          <ShiftModal
            date={selectedDate}
            existingShift={selectedShift}
            userId={userId}
            onSaved={handleShiftSaved}
            onDeleted={handleShiftDeleted}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
