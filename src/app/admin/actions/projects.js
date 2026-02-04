"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const BUCKET = "projects";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function uploadImage(formData) {
  const supabase = await createClient();
  const file = formData.get("file");
  if (!file || file.size === 0) {
    return { error: "Nenhum arquivo enviado." };
  }
  const ext = file.name.split(".").pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(name, file, { upsert: false });
  if (error) return { error: error.message };
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return { url: publicUrl };
}

export async function createProject(formData) {
  const supabase = await createClient();
  const title = formData.get("title")?.toString() || "";
  const slug =
    formData.get("slug")?.toString()?.trim() || slugify(title) || "projeto";
  const category = formData.get("category")?.toString() || "";
  const excerpt = formData.get("excerpt")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const servicesStr = formData.get("services")?.toString() || "";
  const services = servicesStr
    ? servicesStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const cover_image = formData.get("cover_image")?.toString() || "";
  const galleryStr = formData.get("gallery")?.toString() || "";
  const gallery = galleryStr
    ? galleryStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const published = formData.get("published") === "on";

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      slug,
      category,
      excerpt,
      description,
      services,
      cover_image,
      gallery,
      published,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { id: data.id };
}

export async function updateProject(id, formData) {
  const supabase = await createClient();
  const title = formData.get("title")?.toString() || "";
  const slug =
    formData.get("slug")?.toString()?.trim() || slugify(title) || "projeto";
  const category = formData.get("category")?.toString() || "";
  const excerpt = formData.get("excerpt")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const servicesStr = formData.get("services")?.toString() || "";
  const services = servicesStr
    ? servicesStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const cover_image = formData.get("cover_image")?.toString() || "";
  const galleryStr = formData.get("gallery")?.toString() || "";
  const gallery = galleryStr
    ? galleryStr.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const published = formData.get("published") === "on";

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      slug,
      category,
      excerpt,
      description,
      services,
      cover_image,
      gallery,
      published,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/admin/projects/edit/${id}`);
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/[slug]");
  revalidatePath("/");
  return {};
}

export async function deleteProject(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return {};
}

export async function togglePublished(id, published) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ published })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/admin/projects/edit/${id}`);
  revalidatePath("/portfolio");
  revalidatePath("/");
  return {};
}
