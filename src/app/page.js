"use client";

import { useState } from "react";
import { projects } from "@/app/data/projects";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const [section, setSection] = useState("home");

  return (
    <>
      <Header onMobileNavigate={setSection} />

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block pt-24 px-12 text-white">
        <h1 className="text-5xl font-bold">Bruno Designer</h1>
        <p className="mt-6 max-w-xl text-white/60">
          Designer & Desenvolvedor Front-end.
        </p>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden pt-28 px-6 text-white">

        {section === "home" && (
          <section>
            <h1 className="text-3xl font-bold">Bruno Designer</h1>
            <p className="mt-4 text-white/60">
              Designer & Desenvolvedor Front-end
            </p>
          </section>
        )}

        {section === "sobre" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Sobre</h2>
            <p className="text-white/70">
              Crio interfaces modernas, focadas em estética,
              performance e experiência do usuário.
            </p>
          </section>
        )}

        {section === "portfolio" && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Portfólio</h2>

            <div className="space-y-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className="block border border-white/10 rounded-xl overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-white/60">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {section === "contato" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Contato</h2>
            <p className="text-white/70">
              Entre em contato para projetos ou parcerias.
            </p>

            <a
              href="https://wa.me/SEUNUMERO"
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full text-sm"
            >
              Falar no WhatsApp
            </a>
          </section>
        )}

      </div>
    </>
  );
}
