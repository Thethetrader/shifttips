"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    headline: "Zéro heure oubliée.",
    body: "Chaque service est enregistré au moment où tu le vis. Fini les trous dans ton planning, fini les erreurs de fin de mois.",
  },
  {
    headline: "Ton budget, enfin visible.",
    body: "Pourboires, heures sup, jours de repos — tout est calculé automatiquement. Tu sais exactement ce que tu gagnes.",
  },
];

export default function LandingValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 md:py-24 px-5 border-t border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.12 }}
            className="bg-white px-8 md:px-14 py-10 md:py-14"
          >
            <h3 className="text-3xl md:text-4xl font-serif tracking-tight text-ink leading-tight mb-4">
              {v.headline}
            </h3>
            <p className="text-ink-muted leading-relaxed max-w-[38ch]">
              {v.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
