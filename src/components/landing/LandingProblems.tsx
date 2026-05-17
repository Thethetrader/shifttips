"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    num: "01",
    title: "Tu oublies des jours",
    desc: "Une note iPhone, des heures notées au doigt mouillé, et le dimanche soir tu recalcules tout de tête.",
    stat: "3 oublis",
    statSub: "par mois en moyenne",
  },
  {
    num: "02",
    title: "Tu calcules à la main",
    desc: "Fin de mois, tu additionnes des colonnes de chiffres, tu cherches tes fiches de paie, tu compares les heures sup.",
    stat: "45 min",
    statSub: "perdues chaque fin de mois",
  },
  {
    num: "03",
    title: "Tes pourboires partent en fumée",
    desc: "Tu vis avec tes pourboires au quotidien sans jamais voir le total mensuel. Tu sous-estimes ce que tu gagnes vraiment.",
    stat: "847 €",
    statSub: "de tips invisibles par mois",
  },
];

export default function LandingProblems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 bg-cream-dark">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.2em] mb-4">Ce que tu vis</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight max-w-[520px]">
            Le quotidien de la plupart des serveurs
          </h2>
        </motion.div>

        {/* Editorial rows — no icon cards */}
        <div className="flex flex-col divide-y divide-border/60">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 items-start"
            >
              {/* Big number */}
              <span className="text-5xl md:text-6xl font-bold text-border/60 font-mono leading-none select-none w-[4ch] flex-shrink-0">
                {p.num}
              </span>

              {/* Text */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-ink tracking-tight mb-2">{p.title}</h3>
                <p className="text-ink-muted leading-relaxed max-w-[52ch]">{p.desc}</p>
              </div>

              {/* Callout stat */}
              <div className="md:text-right flex-shrink-0">
                <p className="text-2xl md:text-3xl font-bold text-ink font-mono">{p.stat}</p>
                <p className="text-xs text-ink-muted mt-1">{p.statSub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
