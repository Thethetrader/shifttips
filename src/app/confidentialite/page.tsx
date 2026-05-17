import Link from "next/link";

export const metadata = { title: "Politique de confidentialité — ShiftTips" };

export default function ConfidentialitePage() {
  return (
    <div className="min-h-[100dvh] bg-cream px-5 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-emerald hover:underline mb-8 inline-block">
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-serif tracking-tight text-ink mb-2">Politique de confidentialité</h1>
        <p className="text-ink-muted text-sm mb-10">Dernière mise à jour : mai 2026</p>

        <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Données collectées</h2>
            <p>ShiftTips collecte uniquement les données que vous saisissez volontairement : adresse email, prénom, nom, informations de contrat, heures travaillées et pourboires. Aucune donnée de localisation, aucun tracking comportemental.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Stockage et sécurité</h2>
            <p>Vos données sont stockées sur l&apos;infrastructure Supabase (Postgres chiffré, hébergé en Europe). Chaque utilisateur n&apos;a accès qu&apos;à ses propres données (Row Level Security activée).</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Partage des données</h2>
            <p>Vos données ne sont jamais vendues, partagées ou transmises à des tiers. Elles ne sont utilisées qu&apos;au sein de l&apos;application ShiftTips.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Vos droits</h2>
            <p>Vous pouvez demander la suppression de votre compte et de toutes vos données à tout moment en nous contactant via l&apos;app ou par email. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement de vos données.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Contact</h2>
            <p>Pour toute question relative à vos données : brey.theodore4@gmail.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
