import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PortfolioGrid from "./PortfolioGrid";

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, slug, category, excerpt, cover_image")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mb-16 max-w-5xl">
        <h1 className="text-4xl font-light uppercase tracking-widest">
          PORTFÓLIO
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/70">
          Projetos desenvolvidos com foco em posicionamento profissional,
          credibilidade e estética minimalista.
        </p>
      </div>

      <PortfolioGrid projects={projects || []} />
    </main>
  );
}
