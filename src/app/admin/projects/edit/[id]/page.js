import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminProjectForm from "@/app/admin/AdminProjectForm";

export default async function AdminEditProjectPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div>
      <div className="mb-10 flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-xs uppercase tracking-widest text-white/50 hover:text-white"
        >
          ← Projetos
        </Link>
        <h1 className="text-2xl font-light uppercase tracking-widest">
          Editar: {project.title}
        </h1>
      </div>
      <AdminProjectForm project={project} />
    </div>
  );
}
