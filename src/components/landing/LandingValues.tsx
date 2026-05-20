"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    icon: "🕐",
    headline: "Chaque heure compte. Vraiment.",
    body: "Tu enregistres ton service en temps réel. Toutes tes heures sont conservées, même si la feuille d'émargement ne correspond pas à ce que tu as vraiment travaillé. La preuve est dans ta poche.",
  },
  {
    icon: "💸",
    headline: "Vois enfin ce que tu gagnes réellement.",
    body: "Pourboires cumulés, heures supplémentaires, moyenne par service : tout est calculé automatiquement. Une visibilité claire sur tes revenus, c'est un budget qu'on gère mieux.",
  },
  {
    icon: "📤",
    headline: "Envoie tes heures au manager en un clic.",
    body: "Génère un PDF professionnel de tes heures du mois — avec ta date, tes horaires et ton total — et envoie-le directement à ton responsable. Plus besoin de chercher dans ta mémoire.",
  },
  {
    icon: "🎁",
    headline: "100 % gratuit. Pour toujours.",
    body: "Pas d'abonnement, pas de version premium cachée, pas de pub. Shyftips est gratuit parce que ton revenu mérite d'être visible sans frais supplémentaires.",
  },
];

export default function LandingValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 md:py-24 px-5 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted mb-3">Pourquoi Shyftips</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight">
            Deux minutes par jour.<br />
            <em className="not-italic text-emerald">Zéro surprise en fin de mois.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.1 }}
              className="bg-white px-8 md:px-14 py-10 md:py-14"
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="text-2xl md:text-3xl font-serif tracking-tight text-ink leading-tight mb-4">
                {v.headline}
              </h3>
              <p className="text-ink-muted leading-relaxed max-w-[38ch]">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
