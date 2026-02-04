import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, slug, published, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-light uppercase tracking-widest mb-8">
          Projetos
        </h1>
        <p className="text-white/70 mb-4">
          Erro ao carregar. Verifique o Supabase e a tabela{" "}
          <code className="text-white/50">projects</code>.
        </p>
        <p className="text-sm text-red-400">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-light uppercase tracking-widest">
          Projetos
        </h1>
        <Link
          href="/admin/projects/new"
          className="border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
        >
          Novo projeto
        </Link>
      </div>
      {!projects?.length ? (
        <p className="text-white/50">Nenhum projeto ainda.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between border border-white/10 p-4"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-xs text-white/50">
                  /portfolio/{project.slug || project.id} •{" "}
                  {project.published ? "Publicado" : "Rascunho"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/edit/${project.id}`}
                  className="text-xs uppercase tracking-widest text-white/70 hover:text-white"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
