import Link from 'next/link';

export default function Sobre() {
  return (
    <main className='min-h-screen bg-black px-6 py-24 text-white'>
      <div className='mx-auto max-w-5xl'>
        {/* Header */}
        <div className='mb-16'>
          <h1 className='text-4xl font-light uppercase tracking-widest'>
            Sobre
          </h1>
          <p className='mt-4 max-w-xl text-sm text-white/70'>Conheça um pouco mais sobre minha trajetória, visão e forma de trabalho.</p>
        </div>
        {/* Content */}
        <div className='grid gap-16 md:grid-cols-2'>
          {/* Text */}
          <div className=' space-y-6 text-sm leading-relaxed text-white/80'>
          <p>Sou um profissional focado em criar soluções digitais com estética minimalista, clareza visual e posicionamento estrátegico.</p>
          <p>Acredito que um bom projeto vai além do visual. Ele comunica, transmite confiança e gera valor real para quem utiliza.</p>
          <p>Cada trabalho é desenvolvido com atenção aos detalhes, alinhando design, funcionalidade e objetivos claros.</p>
          <p>Meu processo é baseado em entender o problema, criar uma solução eficiente e entregar algo que realmente faça sentido.</p>
          </div>
          {/* Bloco visual / imagem */}
          <div className='flex items-center justify-center'>
            <div className='aspect-[3/4] w-full max-w-sm border border-white/10 bg-neutral-900 flex items-center justify-center text-xs uppercase tracking-widest text-white/30'>
            Foto
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className='mt-24'>
          <Link 
          href='/contato'
          className='inline-block border border-white px-3 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition'>
            Entrar em contato
          </Link>
        </div>
      </div>
    </main>
  );
}