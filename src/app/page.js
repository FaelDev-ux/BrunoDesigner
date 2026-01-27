import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-7x1 mx-auto flex flex-col justify-center min-h-[80vh]">
      {/* Hero */}
      <div className="space-y-8">
        <h1 className="text-4x1 md:text-6x1 font-light leading-tight tracking-tight">
          Identidade Visual e presença digital 
          <br/>
          <span className="text-gray-400">
            com foco em resultados para seu négocio.
          </span>
        </h1>

        <p className="max-w-2x1 text-gray-400 text-base md:text-lg leading-relaxed">
          Olá! Sou Bruno, designer gráfico especializado em criar identidades visuais impactantes e sites profissionais que ajudam empresas a se destacarem no mercado digital. Vamos trabalhar juntos para levar sua marca ao próximo nível!
        </p>

        {/* CTA */}
        <div className="flex gap-6 pt-4">
          <Link href="/portfolio"
          className="border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black trasition">
            Ver Portfolio
          </Link>
          <Link href="/contato"
          className="bg-white px-8 py-3 text-sm uppercase tracking-widest text-black hover:bg-gray-200 trasition">
            Entrar em Contato
          </Link>
        </div>

      </div>

    </section>
  );
}