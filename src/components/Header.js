import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10">
      <div className="max-w-7x1 mx-auto flex items-center justify-between py-6 px-6 md:px-12">
        {/* Logo / Nome*/}
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Bruno Designer
        </Link>

        {/* Navegação */}
        <nav className="flex gap-8 text-sm uppercase tracking-widest">
          <Link href="/sobre" className="hover:text-gray-300 transition">Sobre</Link>
          <Link href="/portfolio" className="hover:text-gray-300 transition">Portfolio</Link>
          <Link href="/contato" className="hover:text-gray-300 transition">Contato</Link>

        </nav>
      </div>
    </header>
  )
}