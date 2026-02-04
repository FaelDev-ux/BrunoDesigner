import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, slug, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest mb-8">
          Dashboard
        </h1>
        <p className="text-white/70 mb-4">
          Erro ao carregar projetos. Verifique se o Supabase está configurado e
          se a tabela <code className="text-white/50">projects</code> existe
          (rode o SQL em <code className="text-white/50">supabase/schema.sql</code>).
        </p>
        <p className="text-sm text-red-400">{error.message}</p>
      </div>
    );
  }

  const published = projects?.filter((p) => p.published).length ?? 0;
  const draft = (projects?.length ?? 0) - published;

  return (
    <div>
      <h1 className="text-2xl font-light uppercase tracking-widest mb-8">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="border border-white/10 p-6">
          <p className="text-3xl font-light">{projects?.length ?? 0}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
            Total de projetos
          </p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-3xl font-light">{published}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
            Publicados
          </p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-3xl font-light">{draft}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
            Rascunhos
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/projects/new"
          className="border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
        >
          Novo projeto
        </Link>
        <Link
          href="/admin/projects"
          className="border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white/80 hover:border-white hover:text-white transition"
        >
          Ver todos os projetos
        </Link>
      </div>
    </div>
  );
}
