export default function Contato() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-light uppercase tracking-widest">
            Contato
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/70">
            Entre em contato para projetos, parcerias ou dúvidas.
          </p>
        </div>
        {/* Conteudo */}
        <div className="grid gap-16 md:grid-cols-2">
          {/* Texto */}
          <div className="space-y-6 text-sm leading-relaxed text-white/80">
            <p> Se você busca um design profissional, claro e alinhado com sua identidade visual, estou disponível para conversar.</p>
            <p> Trabalho com projetos institucionais e soluções personalizadas, sempre focando em credibilidade do usuário.</p>
            <p> Utilize um dos canais para iniciar a conversa.</p>

            {/* Contatos */}
            <div className="space-y-4 pt-6 text-xs uppercase tracking-widest">
              <p>
                <span className="text-white/40">Email:</span><br /> contato@brunomartins.com.br
              </p>
              <p>
                <span className="text-white/40">Telefone:</span><br /> (11) 99999-9999
              </p>
              <p>
                <span className="text-white/40">Instagram:</span><br /> @brunomartins.design
              </p>
            </div>
          </div>
          {/* Formulario */}
          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                Mensagem
              </label>
              <textarea
                rows="5"
                placeholder="Conte um pouco sobre o projeto"
                className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="border border-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
            >
              Enviar mensagem
            </button>
          </form>
          
        </div>
      </div>
    </main>
  );
}