"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
