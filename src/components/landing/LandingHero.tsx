"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function PhoneMockup() {
  return (
    <div className="relative w-[220px] h-[440px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-ink rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(26,26,24,0.35)] p-2">
        <div className="w-full h-full bg-cream rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <span className="text-[10px] font-semibold text-ink">9:41</span>
            <div className="w-16 h-4 bg-ink rounded-full opacity-10" />
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-ink/20" />
            </div>
          </div>

          {/* Month header */}
          <div className="px-4 pb-2">
            <p className="text-[9px] text-ink-muted uppercase tracking-widest">Mai 2026</p>
            <div className="flex gap-1.5 mt-1.5">
              <div className="flex-1 bg-white rounded-xl p-2 shadow-sm">
                <p className="text-[8px] text-ink-muted">Heures</p>
                <p className="text-xs font-bold text-ink font-mono">142h</p>
              </div>
              <div className="flex-1 bg-emerald rounded-xl p-2">
                <p className="text-[8px] text-white/60">Tips</p>
                <p className="text-xs font-bold text-white font-mono">847€</p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-2 shadow-sm">
                <p className="text-[8px] text-ink-muted">Services</p>
                <p className="text-xs font-bold text-ink font-mono">21</p>
              </div>
            </div>
          </div>

          {/* Mini calendar */}
          <div className="px-4">
            <div className="grid grid-cols-7 mb-1">
              {["L","M","M","J","V","S","D"].map((d, i) => (
                <div key={i} className="text-center text-[7px] text-ink-faint font-medium">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {/* Week 1 offset */}
              <div /><div /><div />
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].map((d) => {
                const hasShift = [1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26,28].includes(d);
                const isToday = d === 17;
                return (
                  <div
                    key={d}
                    className={`aspect-square rounded-md flex flex-col items-center justify-center
                      ${isToday ? "ring-1 ring-emerald/40" : ""}
                      ${hasShift ? "bg-emerald-50" : "bg-white/60"}
                    `}
                  >
                    <span className={`text-[7px] font-semibold leading-none ${isToday ? "text-emerald" : hasShift ? "text-emerald-700" : "text-ink-muted"}`}>
                      {d}
                    </span>
                    {hasShift && <div className="w-1 h-1 rounded-full bg-emerald mt-0.5 opacity-80" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAB */}
          <div className="absolute bottom-8 right-5 w-9 h-9 bg-emerald rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(15,81,50,0.4)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating tip card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-12 top-16 bg-white rounded-2xl px-3 py-2.5 shadow-[0_8px_24px_rgba(26,26,24,0.12)] border border-border/60 w-32"
      >
        <p className="text-[8px] text-ink-muted uppercase tracking-wider mb-1">Hier soir</p>
        <p className="text-sm font-bold text-ink font-mono">+47€</p>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
          <p className="text-[8px] text-emerald font-medium">Service enregistré</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-14 bottom-24 bg-emerald rounded-2xl px-3 py-2.5 shadow-[0_8px_24px_rgba(15,81,50,0.3)] w-28"
      >
        <p className="text-[8px] text-white/60 uppercase tracking-wider mb-1">Ce mois</p>
        <p className="text-sm font-bold text-white font-mono">847 €</p>
        <p className="text-[8px] text-white/60">en pourboires</p>
      </motion.div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section className="min-h-[100dvh] flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-5 w-full">
        {/* Asymmetric split — text left, phone right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 md:gap-8 items-center">
          {/* Left — content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-soft" />
                <span className="text-xs font-medium text-emerald uppercase tracking-widest">100 % gratuit</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink mb-6"
            >
              Tes heures.
              <br />
              Tes pourboires.
              <br />
              <span className="text-emerald">Enfin clairs.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="text-lg text-ink-muted leading-relaxed max-w-[52ch] mb-10"
            >
              L&apos;app pour les serveurs qui veulent arrêter de calculer à la main
              et enfin voir ce qu&apos;ils gagnent vraiment — heures et pourboires inclus.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/signup"
                className="h-14 px-8 bg-emerald text-white font-semibold text-base rounded-2xl flex items-center justify-center transition-all active:scale-[0.98] active:-translate-y-px hover:bg-emerald-light shadow-[0_8px_24px_rgba(15,81,50,0.3)]"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/login"
                className="h-14 px-8 bg-cream-dark text-ink font-medium text-base rounded-2xl flex items-center justify-center transition-all hover:bg-border border border-border"
              >
                Se connecter
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 text-sm text-ink-muted"
            >
              Installable sur iPhone et Android. Aucune carte bancaire.
            </motion.p>
          </div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="hidden md:flex justify-center md:justify-end pr-8"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-6 mt-16 pt-8 border-t border-border/60"
        >
          <div className="flex -space-x-2">
            {["Felix","Clara","Marco"].map((name) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={name}
                src={`https://ui-avatars.com/api/?name=${name}&background=0F5132&color=fff&size=40&bold=true`}
                alt={name}
                className="w-9 h-9 rounded-full border-2 border-cream"
              />
            ))}
          </div>
          <p className="text-sm text-ink-muted">
            <span className="text-ink font-semibold">+120 serveurs</span> suivent déjà leurs pourboires
          </p>
        </motion.div>
      </div>
    </section>
  );
}
