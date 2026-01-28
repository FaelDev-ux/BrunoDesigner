"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-black border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">

        <Link href="/" className="text-white font-semibold">
          Bruno Designer
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex mr-10 gap-8 text-sm text-white/70">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfólio</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden mr-10  text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-10 py-6 space-y-4">
          <Link onClick={() => setOpen(false)} href="/" className="block">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} href="/portfolio" className="block">
            Portfólio
          </Link>
          <Link onClick={() => setOpen(false)} href="/sobre" className="block">
            Sobre
          </Link>
          <Link onClick={() => setOpen(false)} href="/contato" className="block">
            Contato
          </Link>
        </div>
      )}
    </header>
  );
}
