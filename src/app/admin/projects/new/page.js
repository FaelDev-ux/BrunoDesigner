"use client";

import { useState } from "react";
import Link from "next/link";
import { createProject, uploadImage } from "../../actions/projects";

export default function AdminNewProjectPage() {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  async function handleUploadCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    const input = document.getElementById("cover_image");
    if (input) input.value = result.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = e.target;
    const formData = new FormData(form);
    const result = await createProject(formData);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.id) {
      window.location.href = `/admin/projects/edit/${result.id}`;
    } else {
      window.location.href = "/admin/projects";
    }
  }

  return (
    <div>
      <div className="mb-10 flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="text-xs uppercase tracking-widest text-white/50 hover:text-white"
        >
          ← Projetos
        </Link>
        <h1 className="text-2xl font-light uppercase tracking-widest">
          Novo projeto
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Título
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Nome do projeto"
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Slug (URL)
          </label>
          <input
            type="text"
            name="slug"
            placeholder="url-do-projeto"
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
          <p className="mt-1 text-xs text-white/40">
            Deixe em branco para gerar automaticamente do título.
          </p>
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Categoria
          </label>
          <input
            type="text"
            name="category"
            placeholder="Ex: Branding, Web"
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Descrição curta (excerpt)
          </label>
          <textarea
            name="excerpt"
            rows="2"
            placeholder="Uma linha para cards e listagens"
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Descrição completa
          </label>
          <textarea
            name="description"
            rows="6"
            placeholder="Texto completo do projeto"
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Serviços (separados por vírgula)
          </label>
          <input
            type="text"
            name="services"
            placeholder="Design, Front-end, UI/UX"
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Imagem de capa
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadCover}
            disabled={uploading}
            className="mb-2 block text-sm text-white/70"
          />
          {uploading && (
            <p className="text-xs text-white/50">Enviando…</p>
          )}
          <input
            type="url"
            name="cover_image"
            id="cover_image_url"
            placeholder="Ou cole a URL da imagem"
            className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
            Galeria (URLs separadas por vírgula)
          </label>
          <input
            type="text"
            name="gallery"
            placeholder="https://..., https://..."
            className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            id="published"
            className="h-4 w-4 border-white/30 bg-black"
          />
          <label htmlFor="published" className="text-sm text-white/70">
            Publicado (visível no site)
          </label>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
          >
            Criar projeto
          </button>
          <Link
            href="/admin/projects"
            className="border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
