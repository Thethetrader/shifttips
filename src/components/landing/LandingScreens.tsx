"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";


function CalendarContent() {
  const hasShift = new Set([1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26]);
  return (
    <div className="px-2.5 pb-2 h-full flex flex-col">
      <p className="text-[6.5px] text-ink-muted uppercase tracking-[0.15em] mb-1.5">Mai 2026</p>
      <div className="grid grid-cols-3 gap-1 mb-2">
        <div className="bg-white rounded-lg p-1.5 shadow-sm">
          <p className="text-[5.5px] text-ink-muted">Heures</p>
          <p className="text-[9.5px] font-bold text-ink font-mono">142h</p>
        </div>
        <div className="bg-emerald rounded-lg p-1.5">
          <p className="text-[5.5px] text-white/60">Tips</p>
          <p className="text-[9.5px] font-bold text-white font-mono">847€</p>
        </div>
        <div className="bg-white rounded-lg p-1.5 shadow-sm">
          <p className="text-[5.5px] text-ink-muted">Services</p>
          <p className="text-[9.5px] font-bold text-ink font-mono">21</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[2px]">
        {["L","M","M","J","V","S","D"].map((d,i) => <div key={i} className="text-center text-[5px] text-ink-faint font-semibold">{d}</div>)}
        <div/><div/><div/>
        {Array.from({length:28},(_,i)=>i+1).map(d=>{
          const s=hasShift.has(d), t=d===17;
          return <div key={d} className={`aspect-square rounded-[3px] flex flex-col items-center justify-center ${t?"ring-1 ring-emerald":""} ${s?"bg-emerald/10":"bg-white/50"}`}>
            <span className={`text-[5.5px] font-semibold leading-none ${t?"text-emerald":s?"text-emerald-700":"text-ink-faint"}`}>{d}</span>
            {s&&<div className="w-[2px] h-[2px] rounded-full bg-emerald mt-[1px]"/>}
          </div>;
        })}
      </div>
      <div className="mt-auto flex justify-end pt-1">
        <div className="w-7 h-7 bg-emerald rounded-[10px] flex items-center justify-center shadow-[0_3px_10px_rgba(15,81,50,0.4)]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </div>
    </div>
  );
}

function RecapContent() {
  const bars = [28,32,25,38,30,35,42,29,36,33,40,47];
  const max = 47;
  const months = ["J","A","S","O","N","D","J","F","M","A","M","M"];
  return (
    <div className="px-2.5 pb-2 h-full flex flex-col">
      <p className="text-[6.5px] text-ink-muted uppercase tracking-[0.15em] mb-1.5">Récapitulatif</p>
      <div className="grid grid-cols-2 gap-1 mb-2">
        {[{l:"Heures",v:"142h",bg:"bg-white",t:"text-ink"},{l:"Pourboires",v:"847€",bg:"bg-emerald",t:"text-white"},{l:"Heures sup",v:"+12h",bg:"bg-white",t:"text-ink"},{l:"Repos",v:"8j",bg:"bg-white",t:"text-ink"}].map(s=>(
          <div key={s.l} className={`${s.bg} rounded-lg p-1.5 shadow-sm`}>
            <p className={`text-[5px] ${s.bg==="bg-emerald"?"text-white/60":"text-ink-muted"} mb-0.5`}>{s.l}</p>
            <p className={`text-[10px] font-bold font-mono ${s.t}`}>{s.v}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg p-2 shadow-sm flex-1 flex flex-col">
        <p className="text-[5.5px] text-ink-muted mb-1">Tips / mois</p>
        <div className="flex items-end gap-[1.5px] flex-1">
          {bars.map((b,i)=>(
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-[1.5px]">
              <div className="w-full rounded-[2px]" style={{height:`${(b/max)*36}px`,backgroundColor:i===bars.length-1?"#0F5132":`rgba(15,81,50,${0.12+(b/max)*0.5})`}}/>
              <span className="text-[3.5px] text-ink-faint">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModalContent() {
  return (
    <div className="h-full relative">
      <div className="px-2.5 opacity-25 mt-1.5">
        <div className="grid grid-cols-7 gap-[2px]">
          {Array.from({length:28},(_,i)=>(
            <div key={i} className={`aspect-square rounded-[3px] ${[3,4,6,7,10,11,13,17,18].includes(i)?"bg-emerald/30":"bg-ink/5"}`}/>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.6rem] shadow-[0_-6px_24px_rgba(0,0,0,0.1)] px-3 pt-3 pb-2.5">
        <div className="w-5 h-[2.5px] bg-border rounded-full mx-auto mb-2"/>
        <p className="text-[7px] font-bold text-ink uppercase tracking-widest mb-2">Nouveau service</p>
        <div className="grid grid-cols-2 gap-1.5 mb-1.5">
          <div>
            <p className="text-[5.5px] text-ink-muted mb-0.5">Début</p>
            <div className="h-6 bg-cream rounded-md flex items-center px-1.5">
              <p className="text-[8px] font-bold text-ink font-mono">17:00</p>
            </div>
          </div>
          <div>
            <p className="text-[5.5px] text-ink-muted mb-0.5">Fin</p>
            <div className="h-6 bg-cream rounded-md flex items-center px-1.5">
              <p className="text-[8px] font-bold text-ink font-mono">23:30</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald/8 rounded-md px-1.5 py-1 mb-1.5 flex items-center justify-between">
          <p className="text-[5.5px] text-ink-muted">Durée</p>
          <p className="text-[8.5px] font-bold text-emerald font-mono">6h30</p>
        </div>
        <div className="mb-1.5">
          <p className="text-[5.5px] text-ink-muted mb-0.5">Pourboires</p>
          <div className="h-6 bg-cream rounded-md flex items-center px-1.5 justify-between">
            <p className="text-[8px] font-bold text-ink font-mono">65</p>
            <span className="text-[6px] text-ink-muted">€</span>
          </div>
        </div>
        <div className="h-7 bg-emerald rounded-xl flex items-center justify-center shadow-[0_3px_10px_rgba(15,81,50,0.35)]">
          <p className="text-[7.5px] font-bold text-white">Enregistrer</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingScreens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink">
            Tout en un coup d&rsquo;œil
          </h2>
        </motion.div>

        {/* Fan of 3 phones */}
        <div className="relative flex items-end justify-center" style={{ height: 380 }}>
          {[
            { content: <CalendarContent/>, rotate: -7, x: -155, delay: 0,    label: "Calendrier" },
            { content: <ModalContent/>,   rotate: 0,  x: 0,    delay: 0.12,  label: "Saisie" },
            { content: <RecapContent/>,   rotate: 7,  x: 155,  delay: 0.24,  label: "Récap" },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 70, damping: 18, delay: p.delay }}
              style={{ position: "absolute", bottom: 0, left: `calc(50% + ${p.x}px - 90px)`, zIndex: i === 1 ? 3 : 1 }}
            >
              <motion.div
                style={{ rotate: p.rotate, transformOrigin: "bottom center" }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#111] rounded-[2.6rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] p-[8px]">
                  <div className="w-full h-full bg-cream rounded-[2rem] overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 flex-shrink-0">
                      <span className="text-[8.5px] font-bold text-ink">9:41</span>
                      <div className="w-9 h-2 rounded-full bg-ink/10"/>
                      <div className="w-5 h-2 rounded-sm border border-ink/20 flex items-center px-0.5">
                        <div className="w-3 h-1.5 bg-ink/30 rounded-[1px]"/>
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">{p.content}</div>
                  </div>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + p.delay }}
                className="text-center text-[11px] font-medium text-ink-muted mt-4"
              >
                {p.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
