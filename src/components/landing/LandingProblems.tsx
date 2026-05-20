"use client";

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ── Animation 1 : calendrier avec un jour qui s'efface ── */
function ForgottenCalendar() {
  const hasShift = [0,1,3,4,6,7,8,10,11,13,16,17,19,20,21,23,24];
  const forgottenIdx = 14;

  return (
    <div className="grid grid-cols-7 gap-2 w-[180px]">
      {Array.from({ length: 28 }, (_, i) => {
        const shift = hasShift.includes(i);
        const forgotten = i === forgottenIdx;
        return (
          <motion.div
            key={i}
            animate={forgotten ? {
              backgroundColor: ["#fee2e2", "#fecaca", "#fee2e2"],
              scale: [1, 1.12, 1],
            } : {}}
            transition={forgotten ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-semibold
              ${forgotten ? "bg-red-100 text-red-400 ring-1 ring-red-300" : shift ? "bg-emerald/15 text-emerald-700" : "bg-gray-100 text-gray-300"}
            `}
          >
            {forgotten ? (
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                ?
              </motion.span>
            ) : i + 1}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Animation 2 : calcul qui tourne en boucle ── */
function WrongCalcLight() {
  const results = ["142h", "139h", "148h", "142h", "135h", "142h"];
  const [idx, setIdx] = useState(0);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => {
        const next = (i + 1) % results.length;
        setIsWrong(next !== 0 && next !== 3 && next !== 5);
        return next;
      });
    }, 1200);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 font-mono w-[200px]">
      {[
        { label: "Lun – Ven", val: "22h" },
        { label: "Week-end", val: "15h" },
        { label: "Extras", val: "?" },
      ].map((r) => (
        <div key={r.label} className="flex items-center justify-between text-sm text-ink-muted">
          <span>{r.label}</span>
          <span className="text-ink font-bold">{r.val}</span>
        </div>
      ))}
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <span className="text-ink-muted text-sm">Total</span>
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`text-2xl font-bold font-mono ${isWrong ? "text-red-500" : "text-emerald"}`}
        >
          {results[idx]}
          <span className="text-sm ml-1">{isWrong ? "✗" : "✓"}</span>
        </motion.span>
      </div>
    </div>
  );
}

/* ── Animation 3 : compteur de tips qui s'envole ── */
function TipsCounter() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const [phase, setPhase] = useState<"counting" | "vanish">("counting");

  useEffect(() => {
    let cancelled = false;
    async function loop() {
      while (!cancelled) {
        setPhase("counting");
        await animate(count, 847, { duration: 2.5, ease: "easeOut" });
        if (cancelled) break;
        await new Promise(r => setTimeout(r, 800));
        setPhase("vanish");
        await animate(count, 0, { duration: 0.4, ease: "easeIn" });
        await new Promise(r => setTimeout(r, 600));
      }
    }
    loop();
    return () => { cancelled = true; };
  }, [count]);

  return (
    <div className="text-center">
      <motion.div
        animate={phase === "vanish" ? { opacity: 0, y: -20, scale: 0.8 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.span className="text-[80px] font-bold font-mono leading-none text-[#C9A961]">
          {rounded}
        </motion.span>
        <span className="text-4xl font-bold text-[#C9A961] ml-1">€</span>
      </motion.div>
      <motion.p
        animate={phase === "vanish" ? { opacity: 1 } : { opacity: 0 }}
        className="text-ink-muted text-sm mt-2 font-mono"
      >
        oublié ce mois
      </motion.p>
    </div>
  );
}

const problems = [
  {
    num: "01",
    quote: "J'ai oublié un jour dans mon planning.",
    headline: "Tu oublies des jours.",
    stat: "3 oublis",
    statSub: "par mois en moyenne",
    statColor: "text-ink",
    animation: <ForgottenCalendar />,
    animBg: "bg-red-50",
  },
  {
    num: "02",
    quote: "Encore à additionner mes heures à minuit.",
    headline: "Tu calcules tout à la main.",
    stat: "45 min",
    statSub: "perdues chaque fin de mois",
    statColor: "text-ink",
    animation: <WrongCalcLight />,
    animBg: "bg-gray-50",
  },
  {
    num: "03",
    quote: "Je vis avec mes pourboires.",
    headline: "Tes tips disparaissent.",
    stat: "847 €",
    statSub: "de tips invisibles par mois",
    statColor: "text-[#C9A961]",
    animation: <TipsCounter />,
    animBg: "bg-amber-50",
  },
];

function ProblemRow({ p, i }: { p: typeof problems[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="border-b border-gray-100 last:border-0">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted mb-6">{p.num}</p>
          <p className="text-lg font-serif italic text-ink/40 mb-3">&ldquo;{p.quote}&rdquo;</p>
          <h2 className="text-4xl md:text-[56px] font-serif tracking-tight leading-[1.05] text-ink mb-8">
            {p.headline}
          </h2>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold font-mono ${p.statColor}`}>{p.stat}</span>
            <span className="text-sm text-ink-muted">{p.statSub}</span>
          </div>
        </motion.div>

        {/* Animation card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.12 + i * 0.04 }}
          className={`${p.animBg} rounded-3xl flex items-center justify-center w-full md:w-[280px] h-[200px] md:h-[220px] flex-shrink-0`}
        >
          {p.animation}
        </motion.div>

      </div>
    </div>
  );
}

export default function LandingProblems() {
  return (
    <section className="overflow-hidden bg-white">
      {problems.map((p, i) => <ProblemRow key={i} p={p} i={i} />)}
    </section>
  );
}
