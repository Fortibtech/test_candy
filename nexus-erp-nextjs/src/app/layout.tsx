import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import {
  Layers,
  LayoutDashboard,
  FileText,
  Settings2,
  Hammer,
  Truck,
  CreditCard,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NEXUS ERP | Dashboard Production',
  description: 'Enterprise ERP interface for manufacturing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body className="flex h-screen overflow-hidden antialiased">
        {/* SIDEBAR */}
        <aside className="flex w-64 flex-shrink-0 flex-col bg-dark-900 text-slate-300 shadow-2xl z-20">
          {/* Header Logo */}
          <div className="flex h-16 items-center border-b border-white/5 bg-dark-900/50 px-6">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-brand-600 shadow-lg shadow-brand-600/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-widest text-white">
              NEXUS<span className="font-medium text-brand-500">ERP</span>
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Vue d'ensemble
            </p>
            <Link
              href="/"
              className="group flex items-center rounded-lg border border-brand-600/20 bg-brand-600/10 px-3 py-2.5 text-brand-500"
            >
              <LayoutDashboard className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Tableau de bord</span>
            </Link>
            <Link
              href="/devis-ventes"
              className="group flex items-center rounded-lg px-3 py-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <FileText className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Devis & Ventes</span>
            </Link>

            <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Atelier & Logistique
            </p>
            <Link
              href="/planification"
              className="group flex items-center rounded-lg px-3 py-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Settings2 className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Planification</span>
            </Link>
            <Link
              href="/"
              className="group flex items-center rounded-lg px-3 py-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Hammer className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="flex-1 text-sm font-medium">Fabrication</span>
              <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                45
              </span>
            </Link>
            <Link
              href="/expeditions"
              className="group flex items-center rounded-lg px-3 py-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Truck className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Expéditions</span>
            </Link>
            <Link
              href="/facturation"
              className="group flex items-center rounded-lg px-3 py-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <CreditCard className="mr-3 h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Facturation</span>
            </Link>
          </nav>

          {/* Badge Architecture (Footer) */}
          <div className="mt-auto border-t border-white/5 p-4">
            <div className="flex items-center rounded-lg border border-white/5 bg-dark-800/80 px-3 py-3 shadow-inner">
              <div className="relative mr-3 mt-1 flex h-2.5 w-2.5 self-start">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full border-2 border-green-400 bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Système Opérationnel
                </p>
                <p className="mt-0.5 text-xs font-medium text-white">
                  NestJS / PostgreSQL
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="relative flex h-screen flex-1 flex-col overflow-hidden bg-[#F8FAFC]">
          {/* TOP NAVIGATION */}
          <header className="z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
            {/* Barre de recherche */}
            <div className="group relative flex w-full max-w-md items-center">
              <Search className="absolute left-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-brand-500" />
              <input
                type="text"
                placeholder="Rechercher une commande (ex: CMD-2026), un plan..."
                className="w-full rounded-lg border border-transparent bg-slate-100 py-2 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition-all placeholder:font-normal hover:bg-slate-200/50 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
              />
              <div className="absolute right-2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                ⌘K
              </div>
            </div>

            {/* Profil & Actions */}
            <div className="flex items-center space-x-5">
              <button className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-red-500"></span>
              </button>
              <div className="hidden h-8 w-px bg-slate-200 md:block"></div>
              <div className="group flex cursor-pointer items-center">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Avatar"
                  className="mr-3 h-9 w-9 rounded-full border-2 border-slate-100 object-cover transition-colors group-hover:border-brand-200"
                />
                <div className="hidden md:block">
                  <p className="leading-none text-sm font-semibold text-slate-800 transition-colors group-hover:text-brand-600">
                    Sarah Connor
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Direction Ope.</p>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <div className="relative flex-1 overflow-auto p-8">
            <div className="mx-auto max-w-7xl pb-12">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
