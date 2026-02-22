import type { Metadata } from "next";
import { Outfit, Tajawal, Amiri } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ArabiLearn - Premium EdTech Prototype",
  description: "Prototype d'application d'apprentissage de l'arabe avec CMS Fortibtech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${tajawal.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
