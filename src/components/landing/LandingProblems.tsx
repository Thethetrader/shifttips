"use client";

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ── Animation 1 : calendrier avec un jour qui s'efface ── */
function ForgottenCalendar() {
  const hasShift = [0,1,3,4,6,7,8,10,11,13,16,17,19,20,21,23,24];
  const forgottenIdx = 14;

  return (
    <div className="grid grid-cols-7 gap-1.5 w-[160px]">
      {Array.from({ length: 28 }, (_, i) => {
        const shift = hasShift.includes(i);
        const forgotten = i === forgottenIdx;
        return (
          <motion.div
            key={i}
            animate={forgotten ? {
              backgroundColor: ["#fee2e2", "#fecaca", "#fee2e2"],
              scale: [1, 1.08, 1],
            } : {}}
            transition={forgotten ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-semibold
              ${forgotten ? "bg-red-100 text-red-400 ring-1 ring-red-300" : shift ? "bg-emerald/15 text-emerald-700" : "bg-gray-100 text-gray-300"}
            `}
          >
            {forgotten ? (
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                ?
              </motion.span>
            ) : i + 1}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Animation 2 : calcul qui donne un mauvais résultat (unused — kept as ref) ── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WrongCalc() {
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
  }, []);

  return (
    <div className="flex flex-col gap-3 font-mono">
      {[
        { label: "Lun–Ven", val: "22h" },
        { label: "Week-end", val: "15h" },
        { label: "Extras", val: "?" },
      ].map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-6 text-sm text-white/60">
          <span>{r.label}</span>
          <span className="text-white/90 font-bold">{r.val}</span>
        </div>
      ))}
      <div className="border-t border-white/20 pt-3 flex items-center justify-between">
        <span className="text-white/60 text-sm font-mono">Total</span>
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`text-2xl font-bold font-mono ${isWrong ? "text-red-400" : "text-emerald-400"}`}
        >
          {results[idx]}
          {isWrong && <span className="text-sm ml-1">✗</span>}
          {!isWrong && <span className="text-sm ml-1 text-emerald-400">✓</span>}
        </motion.span>
      </div>
    </div>
  );
}

/* ── Animation 2b : calcul version claire ── */
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
  }, []);

  return (
    <div className="flex flex-col gap-3 font-mono w-[200px]">
      {[
        { label: "Lun–Ven", val: "22h" },
        { label: "Week-end", val: "15h" },
        { label: "Extras", val: "?" },
      ].map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-6 text-sm text-ink-muted">
          <span>{r.label}</span>
          <span className="text-ink font-bold">{r.val}</span>
        </div>
      ))}
      <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
        <span className="text-ink-muted text-sm font-mono">Total</span>
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`text-2xl font-bold font-mono ${isWrong ? "text-red-500" : "text-emerald"}`}
        >
          {results[idx]}
          {isWrong && <span className="text-sm ml-1">✗</span>}
          {!isWrong && <span className="text-sm ml-1">✓</span>}
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
        <motion.span className="text-[72px] font-bold font-mono leading-none text-[#C9A961]">
          {rounded}
        </motion.span>
        <span className="text-3xl font-bold text-[#C9A961] ml-1">€</span>
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
    headline: "Tu oublies des jours.",
    quote: "J'ai oublié un jour dans mon planning.",
    sub: "Un jour manquant sur ta fiche de paie, c'est une heure perdue.",
    bg: "bg-white",
    border: "border-b border-gray-100",
    textColor: "text-ink",
    mutedColor: "text-ink-muted",
    stat: "3 oublis",
    statSub: "par mois en moyenne",
    statColor: "text-ink",
    animation: <ForgottenCalendar />,
    reverse: false,
  },
  {
    num: "02",
    headline: "Tu calcules tout à la main.",
    quote: "Encore à additionner mes heures à minuit.",
    sub: "Fin de mois, tu totalises tout de tête et tu te trompes.",
    bg: "bg-gray-50",
    border: "border-y border-gray-100",
    textColor: "text-ink",
    mutedColor: "text-ink-muted",
    stat: "45 min",
    statSub: "perdues chaque fin de mois",
    statColor: "text-ink",
    animation: <WrongCalcLight />,
    reverse: true,
  },
  {
    num: "03",
    headline: "Tes tips disparaissent.",
    quote: "Je vis avec mes pourboires.",
    sub: "Tu les dépenses sans jamais voir le total mensuel.",
    bg: "bg-gray-50",
    border: "border-t border-gray-100",
    textColor: "text-ink",
    mutedColor: "text-ink-muted",
    stat: "847 €",
    statSub: "de tips invisibles par mois",
    statColor: "text-[#C9A961]",
    animation: <TipsCounter />,
    reverse: false,
  },
];

export default function LandingProblems() {
  return (
    <section className="overflow-hidden">
      {problems.map((p, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef(null);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const inView = useInView(ref, { once: true, margin: "-60px" });

        const textBlock = (
          <motion.div
            initial={{ opacity: 0, x: p.reverse ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="flex flex-col justify-center py-16 md:py-24 px-6 md:px-16"
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-5 ${p.mutedColor}`}>{p.num}</p>

            {/* Pull-quote */}
            <p className={`text-lg font-serif italic mb-4 ${p.textColor} opacity-50`}>
              &ldquo;{p.quote}&rdquo;
            </p>

            <h2 className={`text-4xl md:text-5xl font-serif tracking-tight leading-tight mb-4 ${p.textColor}`}>
              {p.headline}
            </h2>
            <p className={`text-base leading-relaxed mb-10 max-w-[36ch] ${p.mutedColor}`}>{p.sub}</p>
            <div>
              <p className={`text-4xl font-bold font-mono ${p.statColor}`}>{p.stat}</p>
              <p className={`text-sm mt-1 ${p.mutedColor}`}>{p.statSub}</p>
            </div>
          </motion.div>
        );

        const animBlock = (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.15 }}
            className="flex items-center justify-center py-16 md:py-24 px-8"
          >
            {p.animation}
          </motion.div>
        );

        return (
          <div key={i} ref={ref} className={`${p.bg} ${p.border}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr]">
              {p.reverse ? <>{animBlock}{textBlock}</> : <>{textBlock}{animBlock}</>}
            </div>
          </div>
        );
      })}
    </section>
  );
}
