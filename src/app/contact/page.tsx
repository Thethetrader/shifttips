import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact | Shiftips" };

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-white px-5 pt-20 pb-16">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-xs text-ink-muted uppercase tracking-widest hover:text-ink transition-colors">
          ← Shiftips
        </Link>

        <h1 className="text-4xl font-serif tracking-tight text-ink mt-8 mb-4">Contact</h1>
        <p className="text-ink-muted leading-relaxed mb-10">
          Une question, un bug, une suggestion ? Écris-nous directement.
          On répond sous 24h.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="mailto:bonjour@shiftips.app"
            className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald/30 hover:bg-emerald/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald/20 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F5132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-ink text-sm">Email</p>
              <p className="text-ink-muted text-sm">bonjour@shiftips.app</p>
            </div>
          </a>

          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="font-semibold text-ink text-sm mb-1">Temps de réponse</p>
            <p className="text-ink-muted text-sm">Moins de 24h en semaine</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-5 text-sm text-ink-muted">
          <Link href="/confidentialite" className="hover:text-ink transition-colors">Confidentialité</Link>
          <Link href="/cgu" className="hover:text-ink transition-colors">CGU</Link>
        </div>
      </div>
    </div>
  );
}
