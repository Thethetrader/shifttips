"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Camille Rousseau",
    role: "Serveuse — Brasserie Lipp, Paris 6e",
    quote: "J'avais toujours peur de rater des heures en fin de mois. Maintenant je sais exactement combien j'ai travaillé, et j'ai réalisé que mes pourboires représentaient 38 % de mon revenu réel. Ça change tout.",
    avatar: "Camille+Rousseau",
    rating: 5,
  },
  {
    name: "Théo Marchand",
    role: "Serveur — Hôtel Molitor",
    quote: "L'app se souvient de tout à ma place. Le FAB pour saisir le service du jour, c'est vraiment 2 taps et c'est réglé. J'aurais jamais cru qu'une app aussi simple puisse m'économiser autant de stress.",
    avatar: "Theo+Marchand",
    rating: 5,
  },
  {
    name: "Nadia Belkacem",
    role: "Responsable de salle — L'Ami Jean",
    quote: "J'ai recommandé ShiftTips à toute mon équipe. La moitié d'entre eux calculaient leurs heures sup à la main depuis des années. Là c'est automatique, et ça a évité pas mal de tensions avec la direction.",
    avatar: "Nadia+Belkacem",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A961" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function LandingTestimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-3">Témoignages</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-ink leading-tight">
            Ce qu&apos;ils en disent
          </h2>
        </motion.div>

        {/* Asymmetric grid — 1 big + 2 stacked */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5">
          {/* Big testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-border/60 shadow-card flex flex-col justify-between"
          >
            <div>
              <StarRating count={testimonials[0].rating} />
              <p className="text-xl text-ink leading-relaxed mt-5 mb-6 font-serif">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-5 border-t border-border/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ui-avatars.com/api/?name=${testimonials[0].avatar}&background=0F5132&color=fff&size=48&bold=true`}
                alt={testimonials[0].name}
                className="w-11 h-11 rounded-full"
              />
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
                transition={{ duration: 0.5, delay: 0.18 + i * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-border/60 shadow-card flex-1"
              >
                <StarRating count={t.rating} />
                <p className="text-base text-ink leading-relaxed mt-4 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${t.avatar}&background=1A7A4C&color=fff&size=40&bold=true`}
                    alt={t.name}
                    className="w-9 h-9 rounded-full"
                  />
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
