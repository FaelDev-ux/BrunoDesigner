import Link from "next/link";
import projects from "@/app/data/projects";

export default function Portfolio() {
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

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.id}`}
            className="group block"
          >
            <div className="overflow-hidden border border-white/10">
              <div className="aspect-[4/5] bg-neutral-900" />
              <div className="p-5">
                <h2 className="text-sm uppercase tracking-wider">
                  {project.title}
                </h2>
                <span className="mt-2 block text-xs text-white/50">
                  {project.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
