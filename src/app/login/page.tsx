"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("confirm")) {
          setError("Confirme ton email avant de te connecter. Vérifie ta boîte mail.");
        } else if (msg.includes("rate limit")) {
          setError("Trop de tentatives. Attends quelques minutes et réessaie.");
        } else {
          setError("Email ou mot de passe incorrect.");
        }
        setLoading(false);
        return;
      }

      router.push("/app");
      router.refresh();
    } catch {
      setError("Une erreur s'est produite. Vérifie ta connexion et réessaie.");
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-[70px] h-[70px] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(15,81,50,0.15)] bg-white flex-shrink-0">
            <Image src="/logo.jpg" alt="Shiftips" width={70} height={70} className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-ink tracking-tight">Shiftips</span>
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1">
          Bon retour
        </h1>
        <p className="text-ink-muted text-sm mb-8">
          Connecte-toi pour accéder à ton espace.
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
            className="h-12 bg-emerald text-white font-medium rounded-xl transition-all duration-200 active:scale-[0.98] active:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-light"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-emerald font-medium hover:underline">
            Créer un compte
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
