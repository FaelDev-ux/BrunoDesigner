import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminLogout from "./AdminLogout";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Página de login: sem header. Demais rotas: middleware já garantiu auth.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4 md:px-12">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-sm font-medium">
            Admin — Bruno Designer
          </Link>
          <nav className="flex items-center gap-6 text-xs uppercase tracking-widest text-white/60">
            <Link href="/admin/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <Link href="/admin/projects" className="hover:text-white">
              Projetos
            </Link>
            <AdminLogout />
          </nav>
        </div>
      </header>
      <main className="px-6 py-10 md:px-12">{children}</main>
    </div>
  );
}
