import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nova Fleet - Gestion de Flotte",
  description: "Plateforme de gestion de flotte d'entreprise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased flex h-screen overflow-hidden`}>
        {/* Sidebar Fixe */}
        <Sidebar />

        {/* Main Content Scrollable */}
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          {children}
        </main>
      </body>
    </html>
  );
}
