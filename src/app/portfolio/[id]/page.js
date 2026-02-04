import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id
    );
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq(isUuid ? "id" : "slug", id)
    .single();

  if (error || !project) {
    notFound();
  }

  const services = Array.isArray(project.services)
    ? project.services
    : project.services
      ? [project.services]
      : [];
  const gallery = Array.isArray(project.gallery)
    ? project.gallery
    : project.gallery
      ? [project.gallery]
      : [];

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/portfolio"
          className="mb-10 inline-block text-xs uppercase tracking-widest text-white/50 hover:text-white"
        >
          &larr; Voltar ao portfólio
        </Link>

        <h1 className="text-4xl font-light uppercase tracking-widest">
          {project.title}
        </h1>

        <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
          {project.category || "—"}
        </p>

        {project.cover_image && (
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden border border-white/10">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {project.excerpt && (
          <p className="mt-8 max-w-3xl text-lg text-white/80">
            {project.excerpt}
          </p>
        )}

        <p className="mt-10 max-w-3xl text-white/70 leading-relaxed">
          {project.description}
        </p>

        {services.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xs uppercase tracking-widest text-white/50">
              Serviços
            </h2>
            <ul className="flex flex-wrap gap-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="border border-white/20 px-4 py-1 text-xs uppercase tracking-wider"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mt-16 space-y-8">
            <h2 className="text-xs uppercase tracking-widest text-white/50">
              Galeria
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {gallery.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden border border-white/10"
                >
                  <Image
                    src={url}
                    alt={`${project.title} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
