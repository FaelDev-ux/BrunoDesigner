import Link from "next/link";
import Image from "next/image";
import { projects } from "@/app/data/projects";

export default async function ProjectPage({ params }) {
  const { id } = await params;

  const project = projects.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <p>Projeto não encontrado.</p>
        <Link
          href="/portfolio"
          className="mt-6 inline-block underline"
        >
          Voltar ao portfólio
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Voltar */}
        <Link
          href="/portfolio"
          className="mb-10 inline-block text-xs uppercase tracking-widest text-white/50 hover:text-white"
        >
          &larr; Voltar ao portfólio
        </Link>

        {/* Título */}
        <h1 className="text-4xl font-light uppercase tracking-widest">
          {project.title}
        </h1>

        {/* Categoria */}
        <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
          {project.category}
        </p>

        {/* Imagem principal */}
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Descrição */}
        <p className="mt-10 max-w-3xl text-white/70 leading-relaxed">
          {project.description}
        </p>

        {/* Serviços */}
        <div className="mt-12">
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

      </div>
    </main>
  );
}
