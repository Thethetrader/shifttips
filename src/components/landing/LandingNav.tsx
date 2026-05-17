"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald flex items-center justify-center shadow-[0_2px_8px_rgba(15,81,50,0.3)]">
            <span className="text-white font-bold text-sm leading-none">S</span>
          </div>
          <span className="font-semibold text-ink tracking-tight">ShiftTips</span>
        </Link>

        <Link
          href="/signup"
          className="h-10 px-5 bg-emerald text-white text-sm font-medium rounded-xl transition-all active:scale-95 hover:bg-emerald-light shadow-[0_2px_8px_rgba(15,81,50,0.25)] flex items-center"
        >
          Commencer
        </Link>
      </div>
    </motion.header>
  );
}
