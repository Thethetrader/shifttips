"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/* ─── Écran Calendrier ─── */
function CalendarScreen() {
  const hasShift = new Set([1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26,28,29,30]);
  return (
    <div className="px-4 pb-4 h-full flex flex-col">
      <p className="text-[9px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-3">Mai 2026</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <p className="text-[8px] text-ink-muted mb-1">Heures</p>
          <p className="text-sm font-bold text-ink font-mono">142h</p>
        </div>
        <div className="bg-emerald rounded-2xl p-3">
          <p className="text-[8px] text-white/60 mb-1">Tips</p>
          <p className="text-sm font-bold text-white font-mono">847€</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <p className="text-[8px] text-ink-muted mb-1">Services</p>
          <p className="text-sm font-bold text-ink font-mono">21</p>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {["L","M","M","J","V","S","D"].map((d,i) => (
          <div key={i} className="text-center text-[8px] text-ink-faint font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[3px] flex-1">
        <div/><div/><div/>
        {Array.from({length:28},(_,i)=>i+1).map(d => {
          const s = hasShift.has(d), t = d === 17;
          return (
            <div key={d} className={`aspect-square rounded-[6px] flex flex-col items-center justify-center
              ${t ? "ring-1 ring-emerald" : ""}
              ${s ? "bg-emerald/10" : "bg-white/50"}
            `}>
              <span className={`text-[9px] font-semibold leading-none
                ${t ? "text-emerald" : s ? "text-emerald-700" : "text-ink-faint"}
              `}>{d}</span>
              {s && <div className="w-1 h-1 rounded-full bg-emerald mt-[2px]"/>}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end pt-3">
        <motion.div
          animate={{ scale: [1, 1.1, 1], boxShadow: ["0 4px 12px rgba(15,81,50,0.3)","0 6px 20px rgba(15,81,50,0.6)","0 4px 12px rgba(15,81,50,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-11 h-11 bg-emerald rounded-2xl flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Écran Saisie ─── */
function SaisieScreen() {
  return (
    <div className="h-full flex flex-col relative">
      {/* Calendrier flou en fond */}
      <div className="px-4 mt-2 opacity-20 flex-shrink-0">
        <div className="grid grid-cols-7 gap-[3px]">
          {Array.from({length:28},(_,i) => (
            <div key={i} className={`aspect-square rounded-[5px] ${[3,4,6,7,10,11,13,17,18].includes(i) ? "bg-emerald/40" : "bg-ink/8"}`}/>
          ))}
        </div>
      </div>
      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] px-5 pt-5 pb-4">
        <div className="w-8 h-1 bg-border rounded-full mx-auto mb-4"/>
        <p className="text-[10px] font-bold text-ink uppercase tracking-[0.2em] mb-4">Nouveau service</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[8px] text-ink-muted mb-1.5">Début</p>
            <div className="h-10 bg-cream rounded-xl flex items-center px-3">
              <p className="text-sm font-bold text-ink font-mono">17:00</p>
            </div>
          </div>
          <div>
            <p className="text-[8px] text-ink-muted mb-1.5">Fin</p>
            <div className="h-10 bg-cream rounded-xl flex items-center px-3">
              <p className="text-sm font-bold text-ink font-mono">23:30</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald/8 rounded-xl px-3 py-2.5 mb-3 flex items-center justify-between">
          <p className="text-[8px] text-ink-muted">Durée calculée</p>
          <p className="text-sm font-bold text-emerald font-mono">6h30</p>
        </div>
        <div className="mb-3">
          <p className="text-[8px] text-ink-muted mb-1.5">Pourboires</p>
          <div className="h-10 bg-cream rounded-xl flex items-center px-3 justify-between">
            <p className="text-sm font-bold text-ink font-mono">65</p>
            <span className="text-[10px] text-ink-muted font-medium">€</span>
          </div>
        </div>
        <div className="h-12 bg-emerald rounded-2xl flex items-center justify-center shadow-[0_6px_20px_rgba(15,81,50,0.35)]">
          <p className="text-[11px] font-bold text-white">Enregistrer</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Écran Récap ─── */
function RecapScreen() {
  const bars = [28,32,25,38,30,35,42,29,36,33,40,47];
  const months = ["J","A","S","O","N","D","J","F","M","A","M","M"];
  const max = 47;
  return (
    <div className="px-4 pb-4 h-full flex flex-col">
      <p className="text-[9px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-3">Mai 2026</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          {l:"Heures totales", v:"142h",  bg:"bg-white",   t:"text-ink"},
          {l:"Pourboires",    v:"847 €", bg:"bg-emerald", t:"text-white"},
          {l:"Heures sup",   v:"+12h",  bg:"bg-white",   t:"text-ink"},
          {l:"Repos dus",    v:"8 j",   bg:"bg-white",   t:"text-ink"},
        ].map(s => (
          <div key={s.l} className={`${s.bg} rounded-2xl p-3 shadow-sm`}>
            <p className={`text-[7px] mb-1 ${s.bg === "bg-emerald" ? "text-white/60" : "text-ink-muted"}`}>{s.l}</p>
            <p className={`text-sm font-bold font-mono ${s.t}`}>{s.v}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-3 shadow-sm flex-1 flex flex-col">
        <p className="text-[8px] text-ink-muted mb-3">Pourboires par mois</p>
        <div className="flex items-end gap-[3px] flex-1">
          {bars.map((b,i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-[3px]">
              <div
                className="w-full rounded-[3px]"
                style={{
                  height: `${(b/max)*70}px`,
                  backgroundColor: i === bars.length-1 ? "#0F5132" : `rgba(15,81,50,${0.12+(b/max)*0.5})`,
                }}
              />
              <span className="text-[5px] text-ink-faint">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCREENS = [
  { id: "calendar", label: "Calendrier", component: CalendarScreen },
  { id: "saisie",   label: "Saisie",     component: SaisieScreen },
  { id: "recap",    label: "Récap",      component: RecapScreen },
];

function Phone({ screenId }: { screenId: string }) {
  const Screen = SCREENS.find(s => s.id === screenId)!.component;
  return (
    <div className="w-[260px] h-[520px] flex-shrink-0 mx-auto">
      <div className="w-full h-full bg-[#111] rounded-[3.2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.35)] p-[11px]">
        <div className="w-full h-full bg-cream rounded-[2.6rem] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2 flex-shrink-0">
            <span className="text-[11px] font-bold text-ink">9:41</span>
            <div className="w-14 h-[14px] rounded-full bg-ink/10"/>
            <div className="flex items-center gap-1">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" className="text-ink/40">
                <rect x="0" y="3" width="2" height="7" rx="0.5"/>
                <rect x="3.5" y="2" width="2" height="8" rx="0.5"/>
                <rect x="7" y="0" width="2" height="10" rx="0.5"/>
                <rect x="10.5" y="0" width="2" height="10" rx="0.5" opacity="0.3"/>
              </svg>
              <div className="w-6 h-3 rounded-sm border border-ink/30 flex items-center px-0.5">
                <div className="w-4 h-2 bg-ink/40 rounded-[2px]"/>
              </div>
            </div>
          </div>
          {/* Screen content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={screenId}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

export default function LandingScreens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("calendar");

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1A1A18] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4">L&rsquo;app</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Tout ce qu&rsquo;il te faut,
            <br />
            rien de superflu.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">

          {/* Tabs + description — left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
          >
            <div className="flex flex-col divide-y divide-white/10">
              {SCREENS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="text-left py-6 group transition-all"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                    className="flex items-center gap-5"
                  >
                    <motion.div
                      animate={{ backgroundColor: active === s.id ? "#0F5132" : "rgba(255,255,255,0.06)" }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <span className={`text-xs font-bold font-mono transition-colors ${active === s.id ? "text-white" : "text-white/30"}`}>
                        0{i+1}
                      </span>
                    </motion.div>
                    <span className={`font-semibold tracking-tight transition-all duration-200 ${active === s.id ? "text-white text-xl" : "text-white/40 text-base"}`}>
                      {s.label}
                    </span>
                  </motion.div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Phone — right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.2 }}
          >
            <Phone screenId={active} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
