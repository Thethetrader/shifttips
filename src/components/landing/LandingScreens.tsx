"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#111] rounded-[2.8rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] p-[9px]">
        <div className="w-full h-full bg-cream rounded-[2.2rem] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1.5 flex-shrink-0">
            <span className="text-[9px] font-bold text-ink">9:41</span>
            <div className="w-12 h-3 rounded-full bg-ink/10" />
            <div className="w-6 h-2.5 rounded-sm border border-ink/20 flex items-center px-0.5">
              <div className="w-3.5 h-1.5 bg-ink/30 rounded-[2px]"/>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function RecapScreen() {
  const bars = [
    { w: 18, tips: 380 },
    { w: 22, tips: 465 },
    { w: 19, tips: 400 },
    { w: 25, tips: 530 },
    { w: 21, tips: 447 },
    { w: 24, tips: 510 },
    { w: 28, tips: 590 },
    { w: 31, tips: 660 },
    { w: 20, tips: 420 },
    { w: 35, tips: 740 },
    { w: 33, tips: 700 },
    { w: 38, tips: 810 },
  ];
  const months = ["Juin","Juil","Août","Sep","Oct","Nov","Déc","Jan","Fév","Mar","Avr","Mai"];
  const maxBar = Math.max(...bars.map(b => b.w));

  return (
    <PhoneFrame className="w-[195px] h-[390px]">
      <div className="flex-1 overflow-hidden px-3.5 pb-3">
        <p className="text-[7.5px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-2">Récapitulatif</p>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {[
            { label: "Heures", val: "142h", bg: "bg-white", txt: "text-ink" },
            { label: "Pourboires", val: "847 €", bg: "bg-emerald", txt: "text-white" },
            { label: "Heures sup", val: "+12h", bg: "bg-white", txt: "text-ink" },
            { label: "Repos dus", val: "8j", bg: "bg-white", txt: "text-ink" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-2 shadow-sm`}>
              <p className={`text-[6px] ${s.bg === "bg-emerald" ? "text-white/60" : "text-ink-muted"} mb-0.5`}>{s.label}</p>
              <p className={`text-[12px] font-bold font-mono ${s.txt}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-xl p-2.5 shadow-sm">
          <p className="text-[6.5px] text-ink-muted mb-2">Pourboires / mois</p>
          <div className="flex items-end gap-[2px] h-[60px]">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-[2px]">
                <div
                  className="w-full rounded-[2px]"
                  style={{
                    height: `${(b.w / maxBar) * 52}px`,
                    backgroundColor: i === bars.length - 1 ? "#0F5132" : `rgba(15,81,50,${0.15 + (b.w / maxBar) * 0.45})`,
                  }}
                />
                <span className="text-[4.5px] text-ink-faint leading-none">{months[i].slice(0,1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ModalScreen() {
  return (
    <PhoneFrame className="w-[195px] h-[390px]">
      {/* Background calendar (blurred) */}
      <div className="flex-1 relative overflow-hidden">
        <div className="px-3.5 opacity-30">
          <div className="grid grid-cols-7 gap-[2px] mt-1">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className={`aspect-square rounded-[4px] ${[3,4,6,7,8,10,11,13,17,18].includes(i) ? "bg-emerald/30" : "bg-ink/5"}`} />
            ))}
          </div>
        </div>

        {/* Bottom sheet */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-[0_-8px_32px_rgba(0,0,0,0.12)] px-4 pt-4 pb-3">
          {/* Handle */}
          <div className="w-8 h-1 bg-border rounded-full mx-auto mb-3" />

          <p className="text-[9px] font-bold text-ink uppercase tracking-widest mb-3">Nouveau service</p>

          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <div>
              <p className="text-[7px] text-ink-muted mb-1">Début</p>
              <div className="h-8 bg-cream rounded-lg flex items-center px-2.5">
                <p className="text-[10px] font-bold text-ink font-mono">17:00</p>
              </div>
            </div>
            <div>
              <p className="text-[7px] text-ink-muted mb-1">Fin</p>
              <div className="h-8 bg-cream rounded-lg flex items-center px-2.5">
                <p className="text-[10px] font-bold text-ink font-mono">23:30</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald/8 rounded-lg px-2.5 py-1.5 mb-2.5 flex items-center justify-between">
            <p className="text-[7px] text-ink-muted">Durée calculée</p>
            <p className="text-[11px] font-bold text-emerald font-mono">6h30</p>
          </div>

          <div className="mb-2.5">
            <p className="text-[7px] text-ink-muted mb-1">Pourboires</p>
            <div className="h-8 bg-cream rounded-lg flex items-center px-2.5 relative">
              <p className="text-[10px] font-bold text-ink font-mono">65</p>
              <span className="absolute right-2.5 text-[8px] text-ink-muted font-medium">€</span>
            </div>
          </div>

          <div className="h-8 bg-emerald rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(15,81,50,0.35)]">
            <p className="text-[9px] font-bold text-white">Enregistrer</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function CalendarScreenFull() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hasShift = new Set([1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26,28,29,30]);

  return (
    <PhoneFrame className="w-[220px] h-[440px]">
      <div className="flex-1 flex flex-col overflow-hidden px-3.5 pb-3">
        <p className="text-[8px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-2">Mai 2026</p>

        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <p className="text-[7px] text-ink-muted">Heures</p>
            <p className="text-[12px] font-bold text-ink font-mono">142h</p>
          </div>
          <div className="bg-emerald rounded-xl p-2">
            <p className="text-[7px] text-white/60">Tips</p>
            <p className="text-[12px] font-bold text-white font-mono">847€</p>
          </div>
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <p className="text-[7px] text-ink-muted">Services</p>
            <p className="text-[12px] font-bold text-ink font-mono">21</p>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {["L","M","M","J","V","S","D"].map((d, i) => (
            <div key={i} className="text-center text-[6.5px] text-ink-faint font-semibold">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[2.5px]">
          <div/><div/><div/>
          {days.map((d) => {
            const shift = hasShift.has(d);
            const isToday = d === 17;
            return (
              <div key={d} className={`aspect-square rounded-[5px] flex flex-col items-center justify-center
                ${isToday ? "ring-1 ring-emerald" : ""}
                ${shift ? "bg-emerald/10" : "bg-white/50"}
              `}>
                <span className={`text-[7px] font-semibold leading-none
                  ${isToday ? "text-emerald" : shift ? "text-emerald-700" : "text-ink-faint"}
                `}>{d}</span>
                {shift && <div className="w-[3px] h-[3px] rounded-full bg-emerald mt-[1px]"/>}
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex justify-end pt-2">
          <div className="w-9 h-9 bg-emerald rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(15,81,50,0.4)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const screens = [
  {
    label: "Calendrier",
    sub: "Chaque jour de travail en un coup d'œil",
    component: <CalendarScreenFull />,
    offset: "mt-0",
  },
  {
    label: "Récapitulatif",
    sub: "Heures, tips et heures sup du mois",
    component: <RecapScreen />,
    offset: "mt-12",
  },
  {
    label: "Saisie rapide",
    sub: "3 taps, tout est enregistré",
    component: <ModalScreen />,
    offset: "mt-6",
  },
];

export default function LandingScreens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header — offset left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-md"
        >
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.2em] mb-4">L&rsquo;app en détail</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight">
            Tout ce qu&rsquo;il te faut,
            <br />
            rien de superflu.
          </h2>
        </motion.div>

        {/* Screens — staggered asymmetric grid */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-8 items-start justify-center md:justify-start">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.label}
              initial={{ opacity: 0, y: 30 + i * 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: i * 0.12,
              }}
              className={`flex flex-col items-center ${screen.offset}`}
            >
              {screen.component}
              <div className="mt-5 text-center">
                <p className="text-sm font-semibold text-ink">{screen.label}</p>
                <p className="text-xs text-ink-muted mt-1 max-w-[160px]">{screen.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
