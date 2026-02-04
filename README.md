# Bruno Designer — Site institucional e portfólio

Next.js (App Router), React, Tailwind CSS, Supabase, Framer Motion.

## Configuração

### 1. Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha com as credenciais do Supabase (Dashboard do projeto → Settings → API):

- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave anon (pública)

### 2. Supabase: tabela e Storage

1. No [Supabase](https://supabase.com/dashboard), crie um projeto.
2. No **SQL Editor**, rode o conteúdo de `supabase/schema.sql` para criar a tabela `projects` e políticas RLS.
3. Em **Storage**, crie um bucket chamado `projects`, marque como **Public**.
4. Em **Authentication → Users**, crie um usuário (email + senha) para acessar o admin.

### 3. Área admin (protegida por senha)

- **URL:** `/admin/login` (não aparece em nenhum menu público).
- Acesso apenas com o email e senha do usuário criado no Supabase Auth.
- Rotas: `/admin/dashboard`, `/admin/projects`, `/admin/projects/new`, `/admin/projects/edit/[id]`.
- Funcionalidades: criar, editar, excluir e publicar/ocultar projetos; upload de imagens no bucket `projects`.

## Getting Started

Primeiro, rode o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000). Para acessar o admin, use [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (email e senha do usuário Supabase).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
