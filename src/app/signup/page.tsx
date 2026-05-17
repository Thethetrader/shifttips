"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("rate limit") || msg.includes("429")) {
          setError("Trop de tentatives. Attends quelques minutes et réessaie.");
        } else if (msg.includes("already registered") || msg.includes("user already exists")) {
          setError("Cet email est déjà utilisé. Connecte-toi à la place.");
        } else if (msg.includes("invalid email")) {
          setError("Adresse email invalide.");
        } else {
          setError("Une erreur s'est produite. Réessaie.");
        }
        setLoading(false);
        return;
      }

      // If session exists, email confirmation is disabled — go straight to app
      if (data.session) {
        router.push("/app");
        router.refresh();
        return;
      }

      // Otherwise, email confirmation is required
      setConfirmationSent(true);
      setLoading(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("rate limit") || msg.includes("429")) {
        setError("Trop de tentatives. Attends quelques minutes et réessaie.");
      } else {
        setError("Erreur : " + msg);
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-cream flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-sm"
      >
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(15,81,50,0.15)] bg-white flex-shrink-0">
            <Image src="/logo.jpg" alt="Shiftips" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-ink tracking-tight">Shiftips</span>
        </Link>

        <AnimatePresence mode="wait">
          {confirmationSent ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F5132" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-ink mb-2">Vérifie ta boîte mail</h2>
              <p className="text-ink-muted text-sm leading-relaxed mb-6">
                Un lien de confirmation a été envoyé à <strong className="text-ink">{email}</strong>. Clique dessus pour activer ton compte.
              </p>
              <p className="text-xs text-ink-faint">
                Pas reçu ? Vérifie tes spams.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1">
                Créer un compte
              </h1>
              <p className="text-ink-muted text-sm mb-8">
                Gratuit. Aucune carte bancaire requise.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm font-medium text-ink">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    required
                    className="h-12 bg-white border-border rounded-xl text-ink placeholder:text-ink-faint focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password" className="text-sm font-medium text-ink">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6 caractères minimum"
                    required
                    className="h-12 bg-white border-border rounded-xl text-ink placeholder:text-ink-faint focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-all"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-red-50 px-4 py-3 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 bg-emerald text-white font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-light"
                >
                  {loading ? "Création…" : "Commencer gratuitement"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-ink-muted">
                Déjà un compte ?{" "}
                <Link href="/login" className="text-emerald font-medium hover:underline">
                  Se connecter
                </Link>
              </p>

              <p className="mt-4 text-center text-xs text-ink-faint">
                En créant un compte, tu acceptes nos{" "}
                <Link href="/cgu" className="underline">CGU</Link> et notre{" "}
                <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
