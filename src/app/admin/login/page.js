"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message === "Invalid login credentials" ? "Email ou senha incorretos." : signInError.message);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light uppercase tracking-widest mb-2">
          Admin
        </h1>
        <p className="text-sm text-white/50 mb-8">
          Acesso restrito. Entre com seu email e senha.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
        <p className="mt-8 text-center">
          <Link href="/" className="text-xs text-white/40 hover:text-white">
            ← Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}
