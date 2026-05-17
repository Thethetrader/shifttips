"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    title: "Tu oublies des jours",
    desc: "Une note iPhone, des heures notées au doigt mouillé, et le dimanche soir tu recalcules tout de tête. Erreurs garanties.",
    stat: "3 oublis",
    statSub: "par mois en moyenne",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3" />
        <rect x="9" y="3" width="6" height="8" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    title: "Tu calcules à la main",
    desc: "Fin de mois, tu additionnes des colonnes de chiffres, tu cherches tes fiches de paie, tu compares les heures sup. C'est épuisant.",
    stat: "45 min",
    statSub: "perdues chaque fin de mois",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Tes pourboires partent en fumée",
    desc: "Tu vis avec tes pourboires au quotidien sans jamais voir le total mensuel. Résultat : tu ne réalises pas ce que tu gagnes vraiment.",
    stat: "847 €",
    statSub: "de tips invisibles par mois",
  },
];

export default function LandingProblems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-3">Le problème</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight max-w-lg">
            Ce que vivent la plupart des serveurs
          </h2>
        </motion.div>

        {/* Zig-zag 2-col layout — not 3 equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`bg-white rounded-3xl p-7 border border-border/60 shadow-card ${i === 2 ? "md:col-span-2 md:max-w-xl" : ""}`}
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-cream-dark flex items-center justify-center flex-shrink-0 text-ink-muted">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-ink mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-ink-muted text-base leading-relaxed">{p.desc}</p>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-border/60 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-ink font-mono">{p.stat}</span>
                <span className="text-sm text-ink-muted">{p.statSub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
