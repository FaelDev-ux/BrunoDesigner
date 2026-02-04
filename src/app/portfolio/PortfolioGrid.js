"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function PortfolioGrid({ projects }) {
  if (!projects?.length) {
    return (
      <p className="text-white/50">Nenhum projeto publicado no momento.</p>
    );
  }

  return (
    <motion.div
      className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="show"
      variants={{
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={item}>
          <Link href={`/portfolio/${project.slug || project.id}`} className="group block">
            <div className="overflow-hidden border border-white/10 transition duration-300 group-hover:border-white/20">
              <div className="aspect-[4/5] relative bg-neutral-900">
                {project.cover_image ? (
                  <Image
                    src={project.cover_image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm uppercase tracking-widest">
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-sm uppercase tracking-wider group-hover:text-white transition">
                  {project.title}
                </h2>
                <span className="mt-2 block text-xs text-white/50">
                  {project.category || "—"}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
