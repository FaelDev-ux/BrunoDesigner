import Link from "next/link";
import projects from "@/app/data/projects";

export default async function ProjectPage({ params }) {
  const { id } = await params;

  const project = projects.find(
    (p) => p.id === id
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <p>Projeto não encontrado.</p>
        <Link href="/portfolio" className="underline">
          Voltar ao portfólio
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/portfolio"
          className="mb-10 inline-block text-xs uppercase tracking-widest text-white/50 hover:text-white"
        >
          &larr; Voltar ao portfólio
        </Link>

        <h1 className="text-4xl font-light uppercase tracking-widest">
          {project.title}
        </h1>

        <p className="mt-6 text-white/70 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-10">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-white/50">
            Serviços
          </h2>

          <ul className="flex flex-wrap gap-3">
            {project.services.map((service) => (
              <li
                key={service}
                className="border border-white/20 px-4 py-1 text-xs uppercase tracking-wider"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 aspect-[16/9] w-full bg-neutral-900 flex items-center justify-center text-white/30 text-sm">
          Imagem do projeto
        </div>
      </div>
    </main>
  );
}
