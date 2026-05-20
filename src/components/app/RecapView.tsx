"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format, getDaysInMonth, addMonths, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  profile: { weekly_hours: number; weekly_rest_days: number; contract_type: string | null; first_name?: string | null; last_name?: string | null };
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

function generateAndPrintPDF(
  shifts: Shift[],
  profile: Props["profile"],
  restaurantName: string,
  currentMonth: Date,
) {
  const monthLabel = format(currentMonth, "MMMM yyyy", { locale: fr });
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "—";

  const rows = shifts
    .slice()
    .sort((a, b) => a.shift_date.localeCompare(b.shift_date))
    .map((s) => {
      const dateLabel = format(new Date(s.shift_date + "T12:00:00"), "EEEE d MMMM", { locale: fr });
      const start = s.start_time ? s.start_time.slice(0, 5) : "—";
      const end = s.end_time ? s.end_time.slice(0, 5) : "—";
      const hWorked = formatHours(s.hours_worked || 0);
      return `<tr>
        <td style="padding:10px 16px;border-bottom:1px solid #eee;text-transform:capitalize">${dateLabel}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #eee;text-align:center;font-family:monospace">${start}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #eee;text-align:center;font-family:monospace">${end}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #eee;text-align:right;font-family:monospace;font-weight:600">${hWorked}</td>
      </tr>`;
    })
    .join("");

  const totalH = formatHours(shifts.reduce((s, sh) => s + (sh.hours_worked || 0), 0));

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title>Relevé d'heures – ${monthLabel}</title>
  <style>
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#1a1a18; background:#fff; padding:40px; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:36px; padding-bottom:24px; border-bottom:2px solid #1a1a18; }
    .brand { font-size:22px; font-weight:800; letter-spacing:-0.5px; color:#0f5132; }
    .brand span { color:#1a1a18; }
    .meta { text-align:right; }
    .meta h1 { font-size:26px; font-weight:700; letter-spacing:-0.5px; text-transform:capitalize; }
    .meta p { font-size:14px; color:#666; margin-top:4px; }
    .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:32px; }
    .info-box { background:#f9f9f7; border-radius:12px; padding:16px 20px; }
    .info-box label { font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#888; display:block; margin-bottom:4px; }
    .info-box strong { font-size:17px; font-weight:600; }
    table { width:100%; border-collapse:collapse; font-size:14px; }
    thead tr { background:#f9f9f7; }
    th { padding:12px 16px; text-align:left; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.12em; color:#888; }
    th:last-child, td:last-child { text-align:right; }
    th:nth-child(2), th:nth-child(3), td:nth-child(2), td:nth-child(3) { text-align:center; }
    .total-row { background:#f0faf5; }
    .total-row td { padding:12px 16px; font-weight:700; font-size:15px; }
    .footer { margin-top:40px; padding-top:20px; border-top:1px solid #eee; display:flex; justify-content:space-between; font-size:11px; color:#aaa; }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">Shyf<span>tips</span></div>
    <div class="meta">
      <h1>${monthLabel}</h1>
      <p>Relevé d'heures</p>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-box">
      <label>Employé·e</label>
      <strong>${fullName}</strong>
    </div>
    <div class="info-box">
      <label>Établissement</label>
      <strong>${restaurantName || "—"}</strong>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Heures</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr class="total-row">
        <td colspan="3">Total du mois</td>
        <td>${totalH}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <span>Généré avec Shyftips · shyftips.com</span>
    <span>Document à usage interne – ne pas diffuser</span>
  </div>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 400);
}

function ExportSheet({
  onClose,
  onExport,
  defaultName,
}: {
  onClose: () => void;
  onExport: (restaurant: string) => void;
  defaultName: string;
}) {
  const [restaurant, setRestaurant] = useState(defaultName);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-[2rem] pb-safe"
      >
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>
        <div className="px-5 pb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-ink tracking-tight">Exporter mes heures</h2>
            <p className="text-sm text-ink-muted mt-1">Génère un PDF à envoyer à ton responsable</p>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm font-medium text-ink">Nom du restaurant / établissement</label>
            <input
              type="text"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              placeholder="Le Grand Café"
              className="h-12 bg-white border border-border rounded-xl text-ink text-base px-4 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20"
            />
          </div>

          <div className="bg-cream-dark rounded-2xl px-4 py-3 mb-6">
            <p className="text-xs text-ink-muted">
              Le PDF contiendra tes dates, heures de début/fin et total d&rsquo;heures. Les pourboires ne sont pas inclus.
            </p>
          </div>

          <button
            onClick={() => onExport(restaurant)}
            className="w-full h-14 bg-emerald text-white font-semibold text-base rounded-2xl transition-all active:scale-[0.98] shadow-[0_8px_24px_rgba(15,81,50,0.25)] hover:bg-emerald-light flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le PDF
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default function RecapView({ shifts, prevShifts, ytdShifts, profile, currentMonth }: Props) {
  const router = useRouter();
  const [exportOpen, setExportOpen] = useState(false);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const goToMonth = (date: Date) => {
    router.push(`/app/recap?month=${format(date, "yyyy-MM")}`);
  };

  const isCurrentMonth = format(currentMonth, "yyyy-MM") === format(new Date(), "yyyy-MM");

  const totalHours = calcTotalHours(shifts);
  const totalTips = calcTotalTips(shifts);
  const prevTotalHours = calcTotalHours(prevShifts);
  const prevTotalTips = calcTotalTips(prevShifts);

  const overtimeHours = calcOvertimeHours(totalHours, profile.weekly_hours);
  const daysInMonth = getDaysInMonth(currentMonth);
  const theoreticalRestDays = calcTheoreticalRestDays(profile.weekly_rest_days, daysInMonth);
  const workedDays = shifts.length;
  const restTaken = daysInMonth - workedDays;

  const tipsChange = calcChangePercent(totalTips, prevTotalTips);
  const hoursChange = calcChangePercent(totalHours, prevTotalHours);
  const ytdTips = ytdShifts.reduce((sum, s) => sum + (s.tips || 0), 0);

  const plannedHours = monthlyContractHours(profile.weekly_hours);

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
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToMonth(subMonths(currentMonth, 1))}
            className="w-8 h-8 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-ink capitalize flex-1 text-center">
            {format(currentMonth, "MMMM yyyy", { locale: fr })}
          </h1>
          <button
            onClick={() => goToMonth(addMonths(currentMonth, 1))}
            disabled={isCurrentMonth}
            className="w-8 h-8 rounded-full bg-white border border-border/60 flex items-center justify-center shadow-sm active:scale-95 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard label="Total heures" value={formatHours(totalHours)} change={hoursChange} index={0} />
        <StatCard label="Pourboires" value={formatTips(totalTips)} change={tipsChange} accent index={1} />
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
          Les jours de repos théoriques sont calculés sur la base des semaines dans le mois ({daysInMonth} jours).
        </p>
      </motion.div>

      {/* Cumul tips YTD */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.45 }}
        className="bg-white rounded-3xl p-5 border border-border/60 shadow-card flex items-center justify-between gap-4 mb-6"
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

      {/* Export button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        onClick={() => setExportOpen(true)}
        className="w-full h-14 bg-white border border-border/60 shadow-card text-ink font-semibold text-base rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:bg-cream-dark"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
        Envoyer mes heures au manager
      </motion.button>

      <AnimatePresence>
        {exportOpen && (
          <ExportSheet
            onClose={() => setExportOpen(false)}
            defaultName=""
            onExport={(restaurant) => {
              setExportOpen(false);
              generateAndPrintPDF(shifts, profile, restaurant, currentMonth);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
