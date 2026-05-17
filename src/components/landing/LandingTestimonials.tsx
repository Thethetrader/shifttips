"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Camille R.",
    role: "Serveuse · Brasserie Lipp, Paris 6e",
    initial: "CR",
    color: "bg-emerald",
    quote: "Je savais pas que mes pourboires pesaient autant. Avec ShiftTips j'ai vu que sur le mois j'avais touché 920 € de tips. Avant je les dépensais sans même les compter. Maintenant je les mets de côté.",
  },
  {
    name: "Théo M.",
    role: "Serveur · Hôtel Molitor",
    initial: "TM",
    color: "bg-ink",
    quote: "Je note mon service en 10 secondes à la fin du shift. Fin de mois, le total est là, je vois mes heures sup, mes jours de repos dus. Ça prend zéro énergie et ça m'a évité une vraie embrouille avec mon patron.",
  },
  {
    name: "Nadia B.",
    role: "Serveuse · L'Ami Jean, Paris",
    initial: "NB",
    color: "bg-emerald",
    quote: "J'ai enfin un vrai suivi. Je voyais jamais où partaient mes pourboires. Là en trois semaines j'ai déjà mieux géré mon budget que les six derniers mois.",
  },
];

function Avatar({ initial, color }: { initial: string; color: string }) {
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-xs font-bold tracking-wide">{initial}</span>
    </div>
  );
}

export default function LandingTestimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-[0.2em] mb-4">Ils l&rsquo;utilisent</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight">
            Ce qu&rsquo;ils en pensent
          </h2>
        </motion.div>

        {/* Asymmetric grid — big + 2 stacked */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5">
          {/* Big */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-border/60 shadow-card flex flex-col justify-between min-h-[220px]"
          >
            <p className="text-xl text-ink leading-[1.6] font-serif mb-6">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-border/60">
              <Avatar initial={testimonials[0].initial} color={testimonials[0].color} />
              <div>
                <p className="font-semibold text-ink text-sm">{testimonials[0].name}</p>
                <p className="text-xs text-ink-muted">{testimonials[0].role}</p>
              </div>
            </div>
          </motion.div>

          {/* 2 stacked */}
          <div className="flex flex-col gap-5">
            {testimonials.slice(1).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-border/60 shadow-card flex-1"
              >
                <p className="text-[15px] text-ink leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <Avatar initial={t.initial} color={t.color} />
                  <div>
                    <p className="font-semibold text-ink text-sm">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
