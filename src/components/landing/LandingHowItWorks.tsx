"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const STEPS = ["Installe l'app", "Saisis un service", "Vois ton revenu"];
const DURATION = 3500;

/* ── Écran 1 : Calendrier avec FAB pulsant ── */
function ScreenCalendar() {
  const hasShift = new Set([1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22]);
  return (
    <div className="flex flex-col h-full px-3 pb-3">
      <p className="text-[7px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-2">Mai 2026</p>
      <div className="grid grid-cols-3 gap-1 mb-2.5">
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <p className="text-[6px] text-ink-muted">Heures</p>
          <p className="text-[10px] font-bold text-ink font-mono">142h</p>
        </div>
        <div className="bg-emerald rounded-xl p-2">
          <p className="text-[6px] text-white/60">Tips</p>
          <p className="text-[10px] font-bold text-white font-mono">847€</p>
        </div>
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <p className="text-[6px] text-ink-muted">Services</p>
          <p className="text-[10px] font-bold text-ink font-mono">21</p>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-0.5">
        {["L","M","M","J","V","S","D"].map((d,i) => <div key={i} className="text-center text-[5.5px] text-ink-faint font-semibold">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-[2px]">
        <div/><div/><div/>
        {Array.from({length:28},(_,i)=>i+1).map(d=>{
          const s = hasShift.has(d), today = d===17;
          return (
            <div key={d} className={`aspect-square rounded-[4px] flex flex-col items-center justify-center
              ${today?"ring-1 ring-emerald":""}${s?" bg-emerald/10":" bg-white/50"}`}>
              <span className={`text-[6px] font-semibold leading-none ${today?"text-emerald":s?"text-emerald-700":"text-ink-faint"}`}>{d}</span>
              {s&&<div className="w-[3px] h-[3px] rounded-full bg-emerald mt-[1px]"/>}
            </div>
          );
        })}
      </div>
      <div className="mt-auto flex justify-end pt-1">
        <motion.div
          animate={{ scale: [1, 1.15, 1], boxShadow: ["0 4px 12px rgba(15,81,50,0.4)", "0 6px 20px rgba(15,81,50,0.7)", "0 4px 12px rgba(15,81,50,0.4)"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-9 h-9 bg-emerald rounded-[14px] flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Écran 2 : Modal de saisie avec auto-remplissage ── */
function ScreenModal() {
  const [startVal, setStartVal] = useState("17:0");
  const [endVal, setEndVal] = useState("23:");
  const [tips, setTips] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStartVal("17:00"), 300));
    timers.push(setTimeout(() => setEndVal("23:3"), 600));
    timers.push(setTimeout(() => setEndVal("23:30"), 900));
    timers.push(setTimeout(() => setTips("6"), 1200));
    timers.push(setTimeout(() => setTips("65"), 1500));
    timers.push(setTimeout(() => setDone(true), 2000));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col h-full relative">
      {/* bg calendar */}
      <div className="flex-1 px-3 opacity-20 mt-2">
        <div className="grid grid-cols-7 gap-[2px]">
          {Array.from({length:28}).map((_,i)=>(
            <div key={i} className={`aspect-square rounded-[3px] ${[3,4,6,7,10,11,13,17,18].includes(i)?"bg-emerald/30":"bg-ink/5"}`}/>
          ))}
        </div>
      </div>
      {/* bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.8rem] shadow-[0_-8px_32px_rgba(0,0,0,0.12)] px-3.5 pt-3.5 pb-3">
        <div className="w-6 h-[3px] bg-border rounded-full mx-auto mb-2.5"/>
        <p className="text-[8px] font-bold text-ink uppercase tracking-widest mb-2.5">Nouveau service</p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <p className="text-[6px] text-ink-muted mb-1">Début</p>
            <div className="h-7 bg-cream rounded-lg flex items-center px-2">
              <p className="text-[9px] font-bold text-ink font-mono">{startVal}<span className="opacity-60 animate-pulse">|</span></p>
            </div>
          </div>
          <div>
            <p className="text-[6px] text-ink-muted mb-1">Fin</p>
            <div className="h-7 bg-cream rounded-lg flex items-center px-2">
              <p className="text-[9px] font-bold text-ink font-mono">{endVal}<span className="opacity-60 animate-pulse">|</span></p>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ backgroundColor: done ? "rgba(15,81,50,0.08)" : "rgba(0,0,0,0.03)" }}
          className="rounded-lg px-2 py-1.5 mb-2 flex items-center justify-between"
        >
          <p className="text-[6px] text-ink-muted">Durée calculée</p>
          <motion.p
            animate={{ color: done ? "#0F5132" : "#6b7280" }}
            className="text-[10px] font-bold font-mono"
          >6h30</motion.p>
        </motion.div>
        <div className="mb-2">
          <p className="text-[6px] text-ink-muted mb-1">Pourboires</p>
          <div className="h-7 bg-cream rounded-lg flex items-center px-2 relative">
            <p className="text-[9px] font-bold text-ink font-mono">{tips}<span className="opacity-60 animate-pulse">|</span></p>
            <span className="absolute right-2 text-[7px] text-ink-muted">€</span>
          </div>
        </div>
        <motion.div
          animate={done ? { backgroundColor: "#0F5132", scale: 1 } : { backgroundColor: "#d1fae5", scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="h-8 rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(15,81,50,0.35)]"
        >
          <p className={`text-[8.5px] font-bold ${done ? "text-white" : "text-emerald-700"}`}>{done ? "Enregistré ✓" : "Enregistrer"}</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Écran 3 : Récap avec stats qui montent ── */
function ScreenRecap() {
  const [shown, setShown] = useState(false);
  useEffect(() => { setTimeout(() => setShown(true), 200); }, []);

  const bars = [28,32,25,38,30,35,42,29,36,33,40,47];
  const max = 47;
  const months = ["J","A","S","O","N","D","J","F","M","A","M","M"];

  return (
    <div className="flex flex-col h-full px-3 pb-3">
      <p className="text-[7px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-2">Récapitulatif</p>
      <div className="grid grid-cols-2 gap-1 mb-2.5">
        {[
          { l: "Heures totales", v: "142h", bg: "bg-white", t: "text-ink" },
          { l: "Pourboires", v: "847 €", bg: "bg-emerald", t: "text-white" },
          { l: "Heures sup", v: "+12h", bg: "bg-white", t: "text-ink" },
          { l: "Repos dus", v: "8j", bg: "bg-white", t: "text-ink" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 8 }}
            animate={shown ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 20 }}
            className={`${s.bg} rounded-xl p-2 shadow-sm`}
          >
            <p className={`text-[5.5px] ${s.bg === "bg-emerald" ? "text-white/60" : "text-ink-muted"} mb-0.5`}>{s.l}</p>
            <p className={`text-[11px] font-bold font-mono ${s.t}`}>{s.v}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-2 shadow-sm flex-1 flex flex-col">
        <p className="text-[6px] text-ink-muted mb-1.5">Pourboires / mois</p>
        <div className="flex items-end gap-[2px] flex-1 min-h-[44px]">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-[2px]">
              <motion.div
                initial={{ height: 0 }}
                animate={shown ? { height: `${(b / max) * 40}px` } : {}}
                transition={{ delay: 0.5 + i * 0.06, type: "spring", stiffness: 120, damping: 20 }}
                className="w-full rounded-[2px]"
                style={{ backgroundColor: i === bars.length - 1 ? "#0F5132" : `rgba(15,81,50,${0.12 + (b / max) * 0.5})` }}
              />
              <span className="text-[4px] text-ink-faint">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const screens = [
  { component: ScreenCalendar },
  { component: ScreenModal },
  { component: ScreenRecap },
];

function AnimatedPhone({ step }: { step: number }) {
  const Screen = screens[step].component;
  return (
    <div className="relative w-[200px] h-[400px] flex-shrink-0">
      <div className="absolute inset-0 bg-[#111] rounded-[2.8rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] p-[9px]">
        <div className="w-full h-full bg-cream rounded-[2.2rem] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 pt-3 pb-1.5 flex-shrink-0">
            <span className="text-[9px] font-bold text-ink">9:41</span>
            <div className="w-10 h-2.5 rounded-full bg-ink/10"/>
            <div className="w-5 h-2 rounded-sm border border-ink/20 flex items-center px-0.5">
              <div className="w-3 h-1.5 bg-ink/30 rounded-[1px]"/>
            </div>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute inset-0"
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingHowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.2em] mb-4">Comment ça marche</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight">
            3 taps et c&rsquo;est fait.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Steps — left */}
          <div className="flex flex-col gap-1">
            {STEPS.map((label, i) => (
              <motion.button
                key={i}
                onClick={() => setStep(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 100, damping: 20 }}
                className="text-left py-6 border-b border-border/60 last:border-0 group relative"
              >
                {/* Progress bar */}
                {step === i && (
                  <motion.div
                    key={`bar-${i}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald"
                  />
                )}
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-mono font-bold tracking-widest transition-colors duration-300 w-6 ${step === i ? "text-emerald" : "text-border"}`}>
                    0{i + 1}
                  </span>
                  <span className={`font-semibold tracking-tight transition-all duration-300 ${step === i ? "text-ink text-xl" : "text-ink-muted text-base"}`}>
                    {label}
                  </span>
                </div>
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/signup"
                className="inline-flex h-[54px] px-8 bg-emerald text-white font-semibold text-[15px] rounded-2xl items-center transition-all active:scale-[0.98] hover:bg-emerald-light shadow-[0_8px_24px_rgba(15,81,50,0.25)]"
              >
                Essayer maintenant
              </Link>
            </motion.div>
          </div>

          {/* Animated phone — right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <AnimatedPhone step={step} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
