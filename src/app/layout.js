import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Bruno Designer",
  description: "Portfolio website of Bruno Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-black text-whhite antialiased">
        <Header />
        <main className="min-h-screen px-6 md:px-12">
          {children}
        </main>
      </body>
    </html>
  );
}