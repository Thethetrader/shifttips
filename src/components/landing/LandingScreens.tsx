"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 bg-[#111] rounded-[2.8rem] p-[9px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]">
      <div className="w-full h-full bg-cream rounded-[2.2rem] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 pt-3 pb-1.5 flex-shrink-0">
          <span className="text-[9px] font-bold text-ink">9:41</span>
          <div className="w-10 h-2.5 rounded-full bg-ink/10" />
          <div className="w-5 h-2 rounded-sm border border-ink/20 flex items-center px-0.5">
            <div className="w-3 h-1.5 bg-ink/30 rounded-[1px]" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function CalendarScreen() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hasShift = new Set([1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26,28,29,30]);
  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col overflow-hidden px-3 pb-3">
        <p className="text-[7.5px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-2">Mai 2026</p>
        <div className="grid grid-cols-3 gap-1 mb-2.5">
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <p className="text-[6.5px] text-ink-muted">Heures</p>
            <p className="text-[11px] font-bold text-ink font-mono">142h</p>
          </div>
          <div className="bg-emerald rounded-xl p-2">
            <p className="text-[6.5px] text-white/60">Tips</p>
            <p className="text-[11px] font-bold text-white font-mono">847€</p>
          </div>
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <p className="text-[6.5px] text-ink-muted">Services</p>
            <p className="text-[11px] font-bold text-ink font-mono">21</p>
          </div>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {["L","M","M","J","V","S","D"].map((d, i) => (
            <div key={i} className="text-center text-[6px] text-ink-faint font-semibold">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[2px]">
          <div/><div/><div/>
          {days.map((d) => {
            const shift = hasShift.has(d);
            const isToday = d === 17;
            return (
              <div key={d} className={`aspect-square rounded-[4px] flex flex-col items-center justify-center
                ${isToday ? "ring-1 ring-emerald" : ""}
                ${shift ? "bg-emerald/10" : "bg-white/50"}
              `}>
                <span className={`text-[6.5px] font-semibold leading-none
                  ${isToday ? "text-emerald" : shift ? "text-emerald-700" : "text-ink-faint"}
                `}>{d}</span>
                {shift && <div className="w-[3px] h-[3px] rounded-full bg-emerald mt-[1px]" />}
              </div>
            );
          })}
        </div>
        <div className="mt-auto flex justify-end pt-1">
          <div className="w-8 h-8 bg-emerald rounded-[12px] flex items-center justify-center shadow-[0_4px_12px_rgba(15,81,50,0.4)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function RecapScreen() {
  const bars = [28,32,25,38,30,35,42,29,36,33,40,47];
  const months = ["J","A","S","O","N","D","J","F","M","A","M","M"];
  const max = Math.max(...bars);
  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col overflow-hidden px-3 pb-3">
        <p className="text-[7.5px] text-ink-muted uppercase tracking-[0.15em] mt-1 mb-2">Récapitulatif</p>
        <div className="grid grid-cols-2 gap-1 mb-2.5">
          {[
            { l: "Heures", v: "142h", bg: "bg-white", t: "text-ink" },
            { l: "Pourboires", v: "847 €", bg: "bg-emerald", t: "text-white" },
            { l: "Heures sup", v: "+12h", bg: "bg-white", t: "text-ink" },
            { l: "Repos dus", v: "8j", bg: "bg-white", t: "text-ink" },
          ].map((s) => (
            <div key={s.l} className={`${s.bg} rounded-xl p-2 shadow-sm`}>
              <p className={`text-[6px] ${s.bg === "bg-emerald" ? "text-white/60" : "text-ink-muted"} mb-0.5`}>{s.l}</p>
              <p className={`text-[12px] font-bold font-mono ${s.t}`}>{s.v}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-2 shadow-sm flex-1 flex flex-col">
          <p className="text-[6px] text-ink-muted mb-1.5">Pourboires par mois</p>
          <div className="flex items-end gap-[2px] flex-1 min-h-[50px]">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-[2px]">
                <div className="w-full rounded-[2px]" style={{
                  height: `${(b / max) * 48}px`,
                  backgroundColor: i === bars.length - 1 ? "#0F5132" : `rgba(15,81,50,${0.12 + (b / max) * 0.5})`,
                }} />
                <span className="text-[4px] text-ink-faint">{months[i]}</span>
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
    <PhoneFrame>
      <div className="flex-1 relative overflow-hidden">
        <div className="px-3 opacity-25 mt-1">
          <div className="grid grid-cols-7 gap-[2px]">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className={`aspect-square rounded-[4px] ${[3,4,6,7,10,11,13,17,18].includes(i) ? "bg-emerald/30" : "bg-ink/5"}`} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.8rem] shadow-[0_-8px_32px_rgba(0,0,0,0.1)] px-3.5 pt-3.5 pb-3">
          <div className="w-7 h-[3px] bg-border rounded-full mx-auto mb-3" />
          <p className="text-[8.5px] font-bold text-ink uppercase tracking-widest mb-2.5">Nouveau service</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="text-[6.5px] text-ink-muted mb-1">Début</p>
              <div className="h-7 bg-cream rounded-lg flex items-center px-2">
                <p className="text-[9px] font-bold text-ink font-mono">17:00</p>
              </div>
            </div>
            <div>
              <p className="text-[6.5px] text-ink-muted mb-1">Fin</p>
              <div className="h-7 bg-cream rounded-lg flex items-center px-2">
                <p className="text-[9px] font-bold text-ink font-mono">23:30</p>
              </div>
            </div>
          </div>
          <div className="bg-emerald/8 rounded-lg px-2 py-1.5 mb-2 flex items-center justify-between">
            <p className="text-[6.5px] text-ink-muted">Durée</p>
            <p className="text-[10px] font-bold text-emerald font-mono">6h30</p>
          </div>
          <div className="mb-2">
            <p className="text-[6.5px] text-ink-muted mb-1">Pourboires</p>
            <div className="h-7 bg-cream rounded-lg flex items-center px-2 justify-between">
              <p className="text-[9px] font-bold text-ink font-mono">65</p>
              <span className="text-[7px] text-ink-muted">€</span>
            </div>
          </div>
          <div className="h-8 bg-emerald rounded-xl flex items-center justify-center shadow-[0_4px_14px_rgba(15,81,50,0.35)]">
            <p className="text-[8.5px] font-bold text-white">Enregistrer</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const phones = [
  { screen: <CalendarScreen />, label: "Calendrier", rotate: -6, x: -20, z: 1 },
  { screen: <ModalScreen />,   label: "Saisie",      rotate: 2,  x: 0,   z: 3 },
  { screen: <RecapScreen />,   label: "Récap",       rotate: 7,  x: 20,  z: 2 },
];

export default function LandingScreens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        {/* Centered minimal header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink">
            Tout en un coup d&rsquo;œil
          </h2>
        </motion.div>

        {/* Fan layout — overlapping phones */}
        <div className="relative flex items-end justify-center" style={{ height: "420px" }}>
          {phones.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              animate={inView ? { opacity: 1, y: 0, rotate: p.rotate } : {}}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                delay: i * 0.15,
              }}
              whileHover={{
                rotate: 0,
                scale: 1.04,
                zIndex: 10,
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }}
              style={{
                position: "absolute",
                width: 200,
                height: 400,
                left: `calc(50% + ${(i - 1) * 160 + p.x}px - 100px)`,
                bottom: 0,
                zIndex: p.z,
                transformOrigin: "bottom center",
                cursor: "pointer",
              }}
            >
              {p.screen}
              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="absolute -bottom-8 left-0 right-0 text-center text-xs font-medium text-ink-muted"
                style={{ rotate: -p.rotate }}
              >
                {p.label}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col items-center gap-16 mt-8">
          {phones.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-4">
              <div className="relative" style={{ width: 200, height: 400 }}>
                {p.screen}
              </div>
              <p className="text-sm font-medium text-ink-muted">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
