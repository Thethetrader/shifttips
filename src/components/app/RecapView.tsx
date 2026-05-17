"use client";

import { motion } from "framer-motion";
import { format, getDaysInMonth } from "date-fns";
import { fr } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Shift } from "@/lib/supabase/types";
import {
  calcTotalHours,
  calcTotalTips,
  calcOvertimeHours,
  calcTheoreticalRestDays,
  calcChangePercent,
  formatHours,
  formatTips,
  monthlyContractHours,
} from "@/lib/calculations";

interface Props {
  shifts: Shift[];
  prevShifts: Shift[];
  ytdShifts: Pick<Shift, "tips">[];
  profile: { weekly_hours: number; weekly_rest_days: number; contract_type: string | null };
  currentMonth: Date;
}

function StatCard({
  label,
  value,
  sub,
  change,
  accent,
  index,
}: {
  label: string;
  value: string;
  sub?: string;
  change?: number | null;
  accent?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.07 }}
      className={`rounded-3xl p-5 ${accent ? "bg-emerald text-white" : "bg-white border border-border/60 shadow-card"}`}
    >
      <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${accent ? "text-white/60" : "text-ink-muted"}`}>
        {label}
      </p>
      <p className={`text-3xl font-bold tracking-tight font-mono ${accent ? "text-white" : "text-ink"}`}>
        {value}
      </p>
      {sub && (
        <p className={`text-xs mt-1 ${accent ? "text-white/60" : "text-ink-muted"}`}>{sub}</p>
      )}
      {change !== undefined && change !== null && (
        <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold px-2 py-1 rounded-lg ${
          change >= 0
            ? accent ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald"
            : "bg-red-50 text-red-600"
        }`}>
          {change >= 0 ? "+" : ""}{change}% vs mois dernier
        </div>
      )}
    </motion.div>
  );
}

export default function RecapView({ shifts, prevShifts, ytdShifts, profile, currentMonth }: Props) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const totalHours = calcTotalHours(shifts);
  const totalTips = calcTotalTips(shifts);
  const prevTotalHours = calcTotalHours(prevShifts);
  const prevTotalTips = calcTotalTips(prevShifts);

  const overtimeHours = calcOvertimeHours(totalHours, profile.weekly_hours);
  const theoreticalRestDays = calcTheoreticalRestDays(profile.weekly_rest_days, totalHours, profile.weekly_hours);
  const workedDays = shifts.length;
  const daysInMonth = getDaysInMonth(currentMonth);
  const restTaken = daysInMonth - workedDays;

  const tipsChange = calcChangePercent(totalTips, prevTotalTips);
  const hoursChange = calcChangePercent(totalHours, prevTotalHours);
  const ytdTips = ytdShifts.reduce((sum, s) => sum + (s.tips || 0), 0);

  // Heures prévues = mensualisation légale (hebdo × 52/12)
  const plannedHours = monthlyContractHours(profile.weekly_hours);

  // Chart data: tips per day of month
  const chartData = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const shift = shifts.find((s) => s.shift_date === dateStr);
    return { day: d, tips: shift?.tips || 0, worked: !!shift };
  });

  const maxTips = Math.max(...chartData.map((d) => d.tips), 1);

  return (
    <div className="min-h-[100dvh] bg-cream px-4 pt-14 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mb-6"
      >
        <p className="text-xs text-ink-muted font-medium uppercase tracking-widest mb-1">Récap mensuel</p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </h1>
      </motion.div>

      {/* Stats grid — asymmetric 2-col */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard
          label="Total heures"
          value={formatHours(totalHours)}
          change={hoursChange}
          index={0}
        />
        <StatCard
          label="Pourboires"
          value={formatTips(totalTips)}
          change={tipsChange}
          accent
          index={1}
        />
        <StatCard
          label="Heures sup"
          value={overtimeHours > 0 ? formatHours(overtimeHours) : "—"}
          sub={overtimeHours > 0 ? `au-delà de ${profile.weekly_hours}h/sem.` : "Contrat respecté"}
          index={2}
        />
        <StatCard
          label="Repos pris"
          value={`${restTaken}j`}
          sub={`/${theoreticalRestDays}j théoriques`}
          index={3}
        />
      </div>

      {/* Planning vs réel */}
      <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.28 }}
          className="bg-white rounded-3xl p-5 border border-border/60 shadow-card mb-6"
        >
          <p className="text-xs text-ink-muted uppercase tracking-widest font-medium mb-4">Planning vs réel</p>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-ink-muted mb-1">Prévu</p>
              <p className="text-2xl font-bold font-mono text-ink">{formatHours(plannedHours)}</p>
            </div>
            <div className="text-center">
              {(() => {
                const diff = totalHours - plannedHours;
                const isPos = diff >= 0;
                return (
                  <div className={`px-3 py-1.5 rounded-xl text-sm font-bold font-mono ${isPos ? "bg-emerald/10 text-emerald" : "bg-red-50 text-red-500"}`}>
                    {isPos ? "+" : ""}{formatHours(Math.abs(diff))}
                  </div>
                );
              })()}
              <p className="text-[10px] text-ink-faint mt-1">écart</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink-muted mb-1">Réel</p>
              <p className="text-2xl font-bold font-mono text-ink">{formatHours(totalHours)}</p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald rounded-full transition-all"
              style={{ width: plannedHours > 0 ? `${Math.min(100, (totalHours / plannedHours) * 100)}%` : "0%" }}
            />
          </div>
          <p className="text-xs text-ink-faint mt-2 text-right">
            {plannedHours > 0 ? `${Math.round((totalHours / plannedHours) * 100)}% du planning réalisé` : ""}
          </p>
        </motion.div>

      {/* Pourboires chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        className="bg-white rounded-3xl p-5 border border-border/60 shadow-card mb-4"
      >
        <p className="text-xs text-ink-muted uppercase tracking-widest font-medium mb-1">
          Pourboires par jour
        </p>
        <p className="text-sm text-ink-muted mb-4">
          Total : <span className="text-ink font-semibold">{formatTips(totalTips)}</span>
        </p>

        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={chartData} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "#9C9C8E" }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const val = payload[0]?.value as number;
                return (
                  <div className="bg-ink text-white text-xs px-3 py-2 rounded-xl shadow-lg">
                    <p className="font-medium">Jour {label}</p>
                    <p>{val > 0 ? `${val}€` : "Repos"}</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="tips" radius={[4, 4, 2, 2]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.tips === 0 ? "#E2E0D8" : entry.tips === maxTips ? "#0F5132" : "#1A7A4C"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Info repos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-cream-dark rounded-2xl px-4 py-3 mb-4"
      >
        <p className="text-xs text-ink-muted">
          Les jours de repos sont calculés de façon déclarative : jours du mois sans service enregistré.
        </p>
      </motion.div>

      {/* Cumul tips YTD */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.45 }}
        className="bg-white rounded-3xl p-5 border border-border/60 shadow-card flex items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-ink-muted mb-1">
            Pourboires {year}
          </p>
          <p className="text-3xl font-bold tracking-tight font-mono text-ink">
            {formatTips(ytdTips)}
          </p>
          <p className="text-xs text-ink-muted mt-1">cumul depuis le 1er janvier</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-emerald/10 flex items-center justify-center flex-shrink-0 text-xl">
          🏆
        </div>
      </motion.div>
    </div>
  );
}
