"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function CalendarPhone() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hasShift = new Set([1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26,28,29,30]);
  const today = 17;

  return (
    <div className="relative w-[230px] h-[460px]">
      <div className="absolute inset-0 bg-[#111] rounded-[3rem] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] p-[10px]">
        <div className="w-full h-full bg-cream rounded-[2.4rem] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
            <span className="text-[10px] font-bold text-ink">9:41</span>
            <div className="flex gap-1 items-center">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" className="text-ink/40"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink/40"><path d="M1 4.5C2.5 2 4.5 1 6 1s3.5 1 5 3.5"/><path d="M3 6.5C3.8 5.3 4.8 4.5 6 4.5s2.2.8 3 2"/><circle cx="6" cy="8" r="0.8" fill="currentColor"/></svg>
              <div className="flex items-center gap-0.5 text-ink/40">
                <div className="w-5 h-2.5 rounded-sm border border-current flex items-center px-0.5"><div className="w-3 h-1.5 bg-current rounded-[1px]"/></div>
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="px-4 pb-2 flex-shrink-0">
            <p className="text-[8px] text-ink-muted uppercase tracking-[0.15em]">Mai 2026</p>
            <div className="grid grid-cols-3 gap-1.5 mt-1.5">
              <div className="bg-white rounded-xl p-2 shadow-sm">
                <p className="text-[7px] text-ink-muted leading-none mb-0.5">Heures</p>
                <p className="text-[11px] font-bold text-ink font-mono leading-none">142h</p>
              </div>
              <div className="bg-emerald rounded-xl p-2">
                <p className="text-[7px] text-white/60 leading-none mb-0.5">Tips</p>
                <p className="text-[11px] font-bold text-white font-mono leading-none">847€</p>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-sm">
                <p className="text-[7px] text-ink-muted leading-none mb-0.5">Services</p>
                <p className="text-[11px] font-bold text-ink font-mono leading-none">21</p>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="px-3 flex-1">
            <div className="grid grid-cols-7 mb-1">
              {["L","M","M","J","V","S","D"].map((d, i) => (
                <div key={i} className="text-center text-[6.5px] text-ink-faint font-semibold tracking-wide">{d}</div>
              ))}
            </div>
            {/* offset 3 (Thu = Wednesday start) */}
            <div className="grid grid-cols-7 gap-[2px]">
              <div/><div/><div/>
              {days.map((d) => {
                const shift = hasShift.has(d);
                const isToday = d === today;
                return (
                  <div key={d} className={`aspect-square rounded-[5px] flex flex-col items-center justify-center relative
                    ${isToday ? "ring-1 ring-emerald ring-offset-0" : ""}
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
          </div>

          {/* FAB */}
          <div className="relative flex justify-end px-4 pb-4 flex-shrink-0 mt-1">
            <div className="w-9 h-9 bg-emerald rounded-[14px] flex items-center justify-center shadow-[0_4px_12px_rgba(15,81,50,0.4)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating tip card */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 top-20 bg-white rounded-2xl px-3 py-2.5 shadow-[0_12px_32px_rgba(26,26,24,0.15)] border border-border/50 w-[118px]"
      >
        <p className="text-[7.5px] text-ink-muted uppercase tracking-wider mb-1">Samedi soir</p>
        <p className="text-[15px] font-bold text-ink font-mono leading-none">+65 €</p>
        <div className="flex items-center gap-1 mt-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald flex-shrink-0"/>
          <p className="text-[7.5px] text-emerald font-semibold">Enregistré · 11h30</p>
        </div>
      </motion.div>

      {/* Heures sup badge */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -left-14 bottom-28 bg-ink rounded-2xl px-3 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.2)] w-[106px]"
      >
        <p className="text-[7.5px] text-white/40 uppercase tracking-wider mb-1">Heures sup</p>
        <p className="text-[15px] font-bold text-white font-mono leading-none">+12h</p>
        <p className="text-[7.5px] text-white/40 mt-1">ce mois</p>
      </motion.div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section className="min-h-[100dvh] flex items-center pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-20 md:gap-12 items-center">

          {/* Left — content */}
          <div className="max-w-[520px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="flex items-center gap-3 mb-8"
            >
              <Image
                src="/icons/icon-192.png"
                alt="ShiftTips"
                width={44}
                height={44}
                className="rounded-2xl shadow-[0_4px_16px_rgba(15,81,50,0.2)]"
              />
              <span className="font-semibold text-ink tracking-tight text-lg">ShiftTips</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-xs font-semibold text-ink-muted uppercase tracking-[0.2em] mb-6"
            >
              Pour les serveurs et serveuses
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-serif text-[52px] md:text-[68px] leading-[1.02] tracking-tight text-ink mb-6"
            >
              Tu sais combien
              <br />
              t&rsquo;as bossé.
              <br />
              <em className="not-italic text-emerald">Mais combien t&rsquo;as gagné&nbsp;?</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="text-[17px] text-ink-muted leading-[1.7] max-w-[46ch] mb-10"
            >
              ShiftTips t&rsquo;aide à enregistrer chaque service en 3 taps et te donne le total heures, pourboires et heures sup à la fin du mois.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/signup"
                className="h-[54px] px-8 bg-emerald text-white font-semibold text-[15px] rounded-2xl flex items-center justify-center transition-all active:scale-[0.97] hover:bg-emerald-light shadow-[0_8px_28px_rgba(15,81,50,0.28)]"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/login"
                className="h-[54px] px-8 text-ink-muted font-medium text-[15px] rounded-2xl flex items-center justify-center transition-all hover:text-ink"
              >
                J&rsquo;ai déjà un compte →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 pt-8 border-t border-border/50 flex flex-wrap gap-6"
            >
              {[
                { val: "100 %", label: "gratuit, sans pub" },
                { val: "3 taps", label: "pour saisir un service" },
                { val: "iOS + Android", label: "installable en PWA" },
              ].map(({ val, label }) => (
                <div key={val}>
                  <p className="text-[15px] font-bold text-ink font-mono">{val}</p>
                  <p className="text-[12px] text-ink-muted mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 22, delay: 0.18 }}
            className="hidden md:flex justify-center md:justify-end pr-6"
          >
            <CalendarPhone />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
