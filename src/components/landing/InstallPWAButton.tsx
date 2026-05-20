"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "iphone" | "android";

// Modal d'instructions pour iOS (Safari ne supporte pas beforeinstallprompt)
function InstallModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("iphone");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-serif tracking-tight text-ink">Installer Shyftips</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 hover:text-ink transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-ink-muted">Ajoute l&apos;app sur ton écran d&apos;accueil — gratuit, sans App Store.</p>
        </div>

        <div className="px-6 mb-4">
          <div className="flex gap-2 bg-ink/5 rounded-2xl p-1">
            {([["iphone", "🍎 iPhone"], ["android", "🤖 Android"]] as [Tab, string][]).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: tab === t ? "white" : "transparent",
                  color: tab === t ? "#0f5132" : "#6b7280",
                  boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            <motion.ol
              key={tab}
              initial={{ opacity: 0, x: tab === "iphone" ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {(tab === "iphone" ? IPHONE_STEPS : ANDROID_STEPS).map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-emerald text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink leading-relaxed">{step}</span>
                </li>
              ))}
            </motion.ol>
          </AnimatePresence>

          <p className="mt-5 text-xs text-ink-muted text-center">
            {tab === "iphone"
              ? "⚠️ Fonctionne uniquement depuis Safari (pas Chrome sur iPhone)"
              : "⚠️ Fonctionne depuis Chrome, Edge ou Samsung Internet"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const IPHONE_STEPS = [
  <>Ouvre <strong>shyftips.com</strong> dans <strong>Safari</strong></>,
  <>Appuie sur le bouton <strong>Partager</strong> <span className="inline-block">📤</span> en bas de l&apos;écran</>,
  <>Fais défiler vers le bas et appuie sur <strong>&ldquo;Sur l&apos;écran d&apos;accueil&rdquo;</strong></>,
  <>Appuie sur <strong>&ldquo;Ajouter&rdquo;</strong> en haut à droite</>,
  <>L&apos;app apparaît sur ton écran d&apos;accueil <strong>comme une vraie app</strong> 🎉</>,
];

const ANDROID_STEPS = [
  <>Ouvre <strong>shyftips.com</strong> dans <strong>Chrome</strong></>,
  <>Appuie sur les <strong>⋮</strong> (3 points) en haut à droite</>,
  <>Appuie sur <strong>&ldquo;Ajouter à l&apos;écran d&apos;accueil&rdquo;</strong> ou <strong>&ldquo;Installer l&apos;application&rdquo;</strong></>,
  <>Confirme en appuyant sur <strong>&ldquo;Installer&rdquo;</strong></>,
  <>L&apos;app apparaît sur ton écran d&apos;accueil <strong>comme une vraie app</strong> 🎉</>,
];

interface InstallPWAButtonProps {
  label?: string;
  subLabel?: string;
  className?: string;
  showIcon?: boolean;
}

export default function InstallPWAButton({ label = "Télécharger l'app", subLabel, className = "", showIcon = false }: InstallPWAButtonProps) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleClick() {
    if (deferredPrompt) {
      // Chrome/Android : déclenche le prompt natif du navigateur
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      // iOS Safari ou déjà installé : affiche le modal d'instructions
      setOpen(true);
    }
  }

  return (
    <>
      <button onClick={handleClick} className={className}>
        {showIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/>
            <path d="M4 20h16"/>
          </svg>
        )}
        {subLabel ? (
          <span className="flex flex-col items-start">
            <span>{label}</span>
            <span className="text-[11px] font-normal opacity-50">{subLabel}</span>
          </span>
        ) : label}
      </button>

      <AnimatePresence>
        {open && <InstallModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
