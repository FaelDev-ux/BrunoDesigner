"use client";

import { useState } from "react";
import Link from "next/link";
import {
  updateProject,
  deleteProject,
  togglePublished,
  uploadImage,
} from "./actions/projects";

export default function AdminProjectForm({ project }) {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    const input = document.getElementById("cover_image_url");
    if (input) input.value = result.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = e.target;
    const formData = new FormData(form);
    const result = await updateProject(project.id, formData);
    if (result.error) {
      setError(result.error);
      return;
    }
    window.location.reload();
  }

  async function handleDelete() {
    if (!confirm("Excluir este projeto? Não é possível desfazer.")) return;
    setDeleting(true);
    setError("");
    const result = await deleteProject(project.id);
    setDeleting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    window.location.href = "/admin/projects";
  }

  async function handleTogglePublished() {
    setError("");
    const result = await togglePublished(project.id, !project.published);
    if (result.error) {
      setError(result.error);
      return;
    }
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
          Título
        </label>
        <input
          type="text"
          name="title"
          defaultValue={project.title}
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
          defaultValue={project.slug || ""}
          placeholder="url-do-projeto"
          className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
          Categoria
        </label>
        <input
          type="text"
          name="category"
          defaultValue={project.category || ""}
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
          defaultValue={project.excerpt || ""}
          placeholder="Uma linha para cards"
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
          defaultValue={project.description || ""}
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
          defaultValue={
            Array.isArray(project.services)
              ? project.services.join(", ")
              : project.services || ""
          }
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
        {uploading && <p className="text-xs text-white/50">Enviando…</p>}
        <input
          type="url"
          name="cover_image"
          id="cover_image_url"
          defaultValue={project.cover_image || ""}
          placeholder="URL da imagem"
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
          defaultValue={
            Array.isArray(project.gallery)
              ? project.gallery.join(", ")
              : project.gallery || ""
          }
          placeholder="https://..., https://..."
          className="w-full border border-white/20 bg-black px-4 py-3 text-sm outline-none focus:border-white"
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="published"
          id="published"
          defaultChecked={project.published}
          className="h-4 w-4 border-white/30 bg-black"
        />
        <label htmlFor="published" className="text-sm text-white/70">
          Publicado (visível no site)
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          className="border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={handleTogglePublished}
          className="border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition"
        >
          {project.published ? "Despublicar" : "Publicar"}
        </button>
        <Link
          href="/admin/projects"
          className="border border-white/30 px-6 py-3 text-xs uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition"
        >
          Voltar
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto border border-red-500/50 px-6 py-3 text-xs uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
        >
          {deleting ? "Excluindo…" : "Excluir projeto"}
        </button>
      </div>
    </form>
  );
}
