"use client";

import Link from "next/link";
import Image from "next/image";
import InstallPWAButton from "@/components/landing/InstallPWAButton";

export default function LandingFooter() {
  return (
    <footer className="bg-ink text-white py-16 px-5">
      <div className="max-w-6xl mx-auto">
        {/* CTA block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-b border-white/10 mb-12">
          <div>
            <h3 className="text-2xl font-serif tracking-tight mb-1">
              Commence à suivre tes pourboires.
            </h3>
            <p className="text-white/50 text-sm">Gratuit. 30 secondes pour s&rsquo;inscrire.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link
              href="/signup"
              className="inline-flex h-12 px-7 bg-emerald text-white font-medium text-sm rounded-xl items-center transition-all hover:bg-emerald-light shadow-[0_4px_16px_rgba(15,81,50,0.4)]"
            >
              Commencer gratuitement
            </Link>
            <InstallPWAButton
              label="📲 Télécharger l'app"
              className="inline-flex h-12 px-7 bg-white/10 text-white font-medium text-sm rounded-xl items-center transition-all hover:bg-white/20"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logovide.png"
              alt="Shiftips"
              width={600}
              height={240}
              className="h-16 w-auto flex-shrink-0 brightness-0 invert"
            />
            <p className="text-white/30 text-[11px]">Suivi heures et pourboires</p>
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
            <Link href="/confidentialite" className="hover:text-white/70 transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgu" className="hover:text-white/70 transition-colors">
              CGU
            </Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Contact
            </Link>
            <span className="text-white/20">©&nbsp;2026 Shyftips</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
