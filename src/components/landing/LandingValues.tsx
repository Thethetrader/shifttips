"use client";

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ── Animation 1 : heures sauvegardées, badge proof ── */
function HoursProof() {
  const shifts = [
    { day: "Lun", h: "8h30" },
    { day: "Mar", h: "7h00" },
    { day: "Mer", h: "9h15" },
    { day: "Jeu", h: "6h45" },
    { day: "Ven", h: "8h00" },
  ];
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= shifts.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 600);
    return () => clearTimeout(t);
  }, [revealed, shifts.length]);

  useEffect(() => {
    const reset = setTimeout(() => setRevealed(0), 5000);
    return () => clearTimeout(reset);
  }, [revealed]);

  const total = shifts.slice(0, revealed).reduce((sum, s) => {
    const [h, m] = s.h.replace("h", ":").split(":").map(Number);
    return sum + h + (m || 0) / 60;
  }, 0);
  const totalH = Math.floor(total);
  const totalM = Math.round((total - totalH) * 60);

  return (
    <div className="flex flex-col gap-2 w-[200px]">
      {shifts.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={i < revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow-sm"
        >
          <span className="text-xs text-ink-muted">{s.day}</span>
          <span className="text-sm font-bold font-mono text-ink">{s.h}</span>
          <motion.div
            initial={{ scale: 0 }}
            animate={i < revealed ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
            className="w-4 h-4 rounded-full bg-emerald flex items-center justify-center"
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
          </motion.div>
        </motion.div>
      ))}
      {revealed === shifts.length && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 bg-emerald rounded-xl px-3 py-2 flex justify-between items-center"
        >
          <span className="text-xs text-white/70 font-semibold uppercase tracking-wider">Total semaine</span>
          <span className="text-sm font-bold font-mono text-white">{totalH}h{String(totalM).padStart(2,"0")}</span>
        </motion.div>
      )}
    </div>
  );
}

/* ── Animation 2 : pourboires qui s'accumulent → budget ── */
function TipsBudget() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const [phase, setPhase] = useState<"up" | "budget">("up");

  useEffect(() => {
    let cancelled = false;
    async function loop() {
      while (!cancelled) {
        setPhase("up");
        await animate(count, 847, { duration: 2.8, ease: "easeOut" });
        if (cancelled) break;
        await new Promise(r => setTimeout(r, 800));
        setPhase("budget");
        await new Promise(r => setTimeout(r, 2000));
        await animate(count, 0, { duration: 0.3 });
        await new Promise(r => setTimeout(r, 400));
      }
    }
    loop();
    return () => { cancelled = true; };
  }, [count]);

  return (
    <div className="flex flex-col items-center gap-4 w-[200px]">
      <motion.div
        animate={phase === "budget" ? { scale: 0.85, opacity: 0.4 } : { scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.span className="text-[64px] font-bold font-mono leading-none text-emerald">
          {rounded}
        </motion.span>
        <span className="text-2xl font-bold text-emerald ml-1">€</span>
        <p className="text-xs text-ink-muted mt-1">de pourboires ce mois</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={phase === "budget" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="w-full bg-white rounded-2xl p-3 shadow-sm"
      >
        <p className="text-[10px] text-ink-muted uppercase tracking-wider mb-2">Impact sur ton budget</p>
        {[
          { label: "Loyer", pct: 45 },
          { label: "Courses", pct: 22 },
          { label: "Épargne", pct: 18 },
          { label: "Loisirs", pct: 15 },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] text-ink-muted w-14 flex-shrink-0">{item.label}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                className="h-full bg-emerald rounded-full"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const values = [
  {
    num: "01",
    quote: "J'ai rien noté, j'sais même plus combien j'ai fait.",
    headline: "Tes heures, sauvegardées pour de bon.",
    body: "Chaque service reste dans ta poche. Même si la feuille de l'employeur est fausse, toi tu as la preuve.",
    animation: <HoursProof />,
    animBg: "bg-emerald/5",
  },
  {
    num: "02",
    quote: "Je sais jamais vraiment combien j'ai touché ce mois.",
    headline: "Vois tes tips. Gère ton budget.",
    body: "Quand tu sais exactement ce que tu gagnes en pourboires, tu gères ton argent autrement. La visibilité, c'est du pouvoir.",
    animation: <TipsBudget />,
    animBg: "bg-amber-50",
  },
];

function ValueRow({ v, i }: { v: typeof values[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="border-b border-gray-100 last:border-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted mb-6">{v.num}</p>
          <p className="text-lg font-serif italic text-ink/40 mb-3">&ldquo;{v.quote}&rdquo;</p>
          <h2 className="text-4xl md:text-[52px] font-serif tracking-tight leading-[1.05] text-ink mb-6">
            {v.headline}
          </h2>
          <p className="text-base text-ink-muted leading-relaxed max-w-[42ch]">{v.body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.1 + i * 0.04 }}
          className={`${v.animBg} rounded-3xl flex items-center justify-center w-full md:w-[280px] h-[220px] md:h-[240px] flex-shrink-0`}
        >
          {v.animation}
        </motion.div>
      </div>
    </div>
  );
}

export default function LandingValues() {
  return (
    <section className="overflow-hidden bg-white border-t border-gray-100">
      {values.map((v, i) => <ValueRow key={i} v={v} i={i} />)}
    </section>
  );
}
