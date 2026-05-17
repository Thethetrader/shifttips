import Link from "next/link";

export const metadata = { title: "CGU — ShiftTips" };

export default function CGUPage() {
  return (
    <div className="min-h-[100dvh] bg-cream px-5 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-emerald hover:underline mb-8 inline-block">
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-serif tracking-tight text-ink mb-2">Conditions générales d&apos;utilisation</h1>
        <p className="text-ink-muted text-sm mb-10">Dernière mise à jour : mai 2026</p>

        <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Objet</h2>
            <p>ShiftTips est une application gratuite destinée aux professionnels de la restauration pour suivre leurs heures de service et leurs pourboires. L&apos;utilisation de l&apos;application est soumise aux présentes CGU.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Utilisation</h2>
            <p>L&apos;application est réservée à un usage personnel. Vous vous engagez à ne pas utiliser ShiftTips à des fins illégales ou contraires aux présentes conditions.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Responsabilité</h2>
            <p>Les calculs fournis par ShiftTips (heures supplémentaires, repos théoriques) sont indicatifs. Ils ne constituent pas un avis juridique ou comptable. Pour toute question sur vos droits salariaux, référez-vous à votre convention collective et à votre employeur.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Disponibilité</h2>
            <p>Nous nous efforçons de maintenir l&apos;application disponible en permanence, mais nous ne pouvons garantir une disponibilité sans interruption. Nous nous réservons le droit de modifier ou d&apos;interrompre le service à tout moment.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Modifications</h2>
            <p>Ces CGU peuvent être modifiées à tout moment. Les utilisateurs seront informés de toute modification substantielle via l&apos;application.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
