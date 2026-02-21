import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATLAS Suisse - Prévoyance Premium",
  description: "Cabinet privé discret. Prévoyance & 3ème Pilier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-atlas-white text-atlas-blue font-sans selection:bg-atlas-blue selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
