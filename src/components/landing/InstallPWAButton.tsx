"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "iphone" | "android";

function InstallModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("iphone");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-serif tracking-tight text-ink">Installer ShiftTips</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 hover:text-ink transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-ink-muted">Ajoute l'app sur ton écran d'accueil — gratuit, sans App Store.</p>
        </div>

        {/* Tabs */}
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

        {/* Steps */}
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
  <>Ouvre <strong>shifttips-565.netlify.app</strong> dans <strong>Safari</strong></>,
  <>Appuie sur le bouton <strong>Partager</strong> <span className="inline-block">📤</span> en bas de l'écran</>,
  <>Fais défiler vers le bas et appuie sur <strong>"Sur l'écran d'accueil"</strong></>,
  <>Appuie sur <strong>"Ajouter"</strong> en haut à droite</>,
  <>L'app apparaît sur ton écran d'accueil <strong>comme une vraie app</strong> 🎉</>,
];

const ANDROID_STEPS = [
  <>Ouvre <strong>shifttips-565.netlify.app</strong> dans <strong>Chrome</strong></>,
  <>Appuie sur les <strong>⋮</strong> (3 points) en haut à droite</>,
  <>Appuie sur <strong>"Ajouter à l'écran d'accueil"</strong> ou <strong>"Installer l'application"</strong></>,
  <>Confirme en appuyant sur <strong>"Installer"</strong></>,
  <>L'app apparaît sur ton écran d'accueil <strong>comme une vraie app</strong> 🎉</>,
];

interface InstallPWAButtonProps {
  label?: string;
  className?: string;
}

export default function InstallPWAButton({ label = "Télécharger l'app", className = "" }: InstallPWAButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      <AnimatePresence>
        {open && <InstallModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
