-- Tabela de projetos (rode no SQL Editor do Supabase)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text default '',
  excerpt text default '',
  description text default '',
  services text[] default '{}',
  cover_image text default '',
  gallery text[] default '{}',
  published boolean default false,
  created_at timestamptz default now()
);

-- Políticas RLS: leitura pública para projetos publicados
alter table public.projects enable row level security;

create policy "Projetos publicados são visíveis para todos"
  on public.projects for select
  using (published = true);

-- Apenas usuários autenticados podem inserir/atualizar/excluir
create policy "Usuários autenticados podem gerenciar projetos"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Índice para listagem por data
create index if not exists projects_created_at_idx on public.projects(created_at desc);
create index if not exists projects_published_idx on public.projects(published) where published = true;

-- Storage: bucket para imagens dos projetos
-- No Dashboard do Supabase: Storage > New bucket > nome "projects" > Public
-- Depois em Policies do bucket "projects": permitir insert/update para authenticated, select para anon (leitura pública)
