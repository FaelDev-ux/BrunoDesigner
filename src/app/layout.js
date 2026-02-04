import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Bruno Designer",
  description: "Portfolio website of Bruno Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-black text-white antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}