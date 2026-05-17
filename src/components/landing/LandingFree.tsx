"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import InstallPWAButton from "@/components/landing/InstallPWAButton";

const features = [
  "Calendrier mensuel visuel",
  "Saisie en 3 taps",
  "Récap heures + pourboires",
  "Calcul heures sup automatique",
  "Installable iOS & Android",
  "Données 100 % privées",
];

export default function LandingFree() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-emerald rounded-[2.5rem] p-8 md:p-12"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Sans frais, sans surprise</p>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight mb-4">
                100 % gratuit.
                <br />
                Pour toujours.
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-[44ch] mb-8">
                ShiftTips est gratuit et sans pub. Pas d&apos;abonnement, pas de version premium cachée.
                Ton revenu mérite d&apos;être visible sans frais supplémentaires.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-14 px-8 bg-white text-emerald font-semibold text-base rounded-2xl items-center transition-all active:scale-[0.98] hover:bg-cream shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                >
                  Commencer gratuitement
                </Link>
                <InstallPWAButton
                  label="📲 Télécharger l'app"
                  className="inline-flex h-14 px-8 bg-white/15 text-white font-semibold text-base rounded-2xl items-center transition-all active:scale-[0.98] hover:bg-white/25"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[220px]">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
