import Link from "next/link";
import Image from "next/image";

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
          <Link
            href="/signup"
            className="inline-flex h-12 px-7 bg-emerald text-white font-medium text-sm rounded-xl items-center transition-all hover:bg-emerald-light shadow-[0_4px_16px_rgba(15,81,50,0.4)] flex-shrink-0"
          >
            Commencer gratuitement
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="ShiftTips"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-semibold text-white text-sm leading-none">ShiftTips</p>
              <p className="text-white/30 text-[11px] mt-0.5">Suivi heures et pourboires</p>
            </div>
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
            <span className="text-white/20">©&nbsp;2026 ShiftTips</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
