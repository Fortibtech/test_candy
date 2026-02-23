import type { Metadata } from 'next';
import './globals.css';

import Sidebar from '@/components/Sidebar';
import { Bell, Search, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Suivi 360° du Bénéficiaire | Réseau Associatif',
  description: 'Plateforme sécurisée de suivi et d\'accompagnement médico-social.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen bg-neutral-50 text-foreground flex flex-col">
        {/* Navigation (Top Bar Globale) */}
        <nav className="bg-white border-b border-primary-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 h-[73px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-neutral-800 hidden sm:block">
                SororTech <span className="text-primary-600 font-medium text-sm ml-1 px-2 py-0.5 bg-primary-50 border border-primary-100 rounded-full">Pro</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Nouveau Badge nLPD / HDS */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-bold text-neutral-600 tracking-wider">SECURE <span className="text-neutral-400">nLPD/HDS</span></span>
            </div>

            <div className="relative max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un dossier sécurisé (identifiant)..."
                className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg w-[300px] text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <button className="relative p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-neutral-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-neutral-500 font-medium text-xs">
              SL
            </div>
          </div>
        </nav>

        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 bg-neutral-50/50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
