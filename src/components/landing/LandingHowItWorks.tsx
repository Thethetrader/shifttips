"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Installe l'app",
    desc: "Ouvre ShiftTips dans ton navigateur, crée un compte en 30 secondes, et installe-le sur ton écran d'accueil comme une vraie app.",
  },
  {
    num: "02",
    title: "Saisis tes services",
    desc: "Après chaque shift, tape l'heure de début et de fin, et le montant de tes pourboires. 3 taps maximum. Ton téléphone fait le reste.",
  },
  {
    num: "03",
    title: "Vois ton vrai revenu",
    desc: "Le récap mensuel te donne le total heures, total pourboires, heures sup et repos d'un coup d'œil. Plus d'erreurs, plus d'oublis.",
  },
];

export default function LandingHowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight">
            Simple comme un service
          </h2>
        </motion.div>

        <div className="flex flex-col gap-px">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              className="flex gap-6 md:gap-10 items-start py-8 border-b border-border/60 last:border-0 group"
            >
              <span className="text-5xl md:text-6xl font-bold text-border font-mono flex-shrink-0 leading-none group-hover:text-emerald-200 transition-colors duration-300">
                {step.num}
              </span>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-semibold text-ink mb-2 tracking-tight">{step.title}</h3>
                <p className="text-ink-muted leading-relaxed max-w-[52ch]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link
            href="/signup"
            className="inline-flex h-14 px-8 bg-emerald text-white font-semibold text-base rounded-2xl items-center transition-all active:scale-[0.98] hover:bg-emerald-light shadow-[0_8px_24px_rgba(15,81,50,0.25)]"
          >
            Essayer maintenant
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
