"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui, complètement. Pas d'abonnement, pas de version freemium, pas de pub. Shyftips est gratuit pour toujours. Tu peux l'utiliser autant que tu veux sans dépenser un centime.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Tes données sont stockées de façon sécurisée sur Supabase (infrastructure Postgres chiffrée). Aucun tiers n'a accès à tes informations. Tu peux supprimer ton compte et toutes tes données à tout moment.",
  },
  {
    q: "Est-ce que ça fonctionne sans connexion internet ?",
    a: "L'app nécessite une connexion pour synchroniser tes données. Si tu n'as pas de réseau, la saisie est temporairement indisponible. Le mode offline complet est prévu en V2.",
  },
  {
    q: "Comment installer l'app sur mon iPhone ?",
    a: "Ouvre Shyftips dans Safari, appuie sur le bouton Partager, puis 'Sur l'écran d'accueil'. L'app s'installe comme une vraie app native — icône, splash screen, mode plein écran.",
  },
  {
    q: "Est-ce que le calcul des heures sup est fiable ?",
    a: "Le calcul est basé sur les paramètres que tu renseignes dans Réglages (heures contrat/semaine, type de contrat). Il est indicatif et te donne une estimation au mois. Pour une valorisation légale précise, réfère-toi à ta convention collective.",
  },
  {
    q: "Puis-je modifier ou supprimer un service déjà saisi ?",
    a: "Oui, tu peux modifier ou supprimer n'importe quel service en cliquant sur le jour correspondant dans le calendrier. Un bouton 'Supprimer' est disponible dans la modal de saisie.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border-b border-border/60 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group min-h-[44px]"
      >
        <span className={`text-base font-medium transition-colors ${open ? "text-emerald" : "text-ink group-hover:text-emerald"}`}>
          {q}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${open ? "bg-emerald text-white" : "bg-cream-dark text-ink-muted"}`}>
          <motion.svg
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-ink-muted leading-relaxed pb-5 max-w-[60ch]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LandingFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-serif tracking-tight text-ink leading-tight">
              Questions fréquentes
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
