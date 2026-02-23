import React from 'react';
import {
  Download,
  Plus,
  BarChart3,
  TrendingUp,
  Hammer,
  AlertTriangle,
  FileClock,
  Flame,
  ChevronRight,
  Check,
  Settings2,
  Truck,
  FileCheck2,
  Search,
  SlidersHorizontal,
  FileCog,
  FileWarning,
  FileDown,
  PenLine,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title Area */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center space-x-2">
            <span className="rounded border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600">
              Vue Consolidée
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Tableau de bord Production
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Analyse des performances et suivi d'atelier en temps réel.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </button>
          <button className="flex transform items-center rounded-lg bg-dark-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-dark-900/10 transition-transform hover:-translate-y-0.5 hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" /> Nouvel OF
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* KPI 1 */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-brand-50 opacity-50 transition-transform group-hover:scale-110"></div>
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-slate-500">Chiffre d'Affaires</p>
            <span className="rounded-xl border border-slate-100 bg-slate-50 p-2 text-slate-600">
              <BarChart3 className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">324 K€</h2>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="mr-2 flex items-center rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" /> +12%
            </span>
            <span className="text-slate-400">vs mois prec.</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-blue-50 opacity-50 transition-transform group-hover:scale-110"></div>
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-slate-500">En Production</p>
            <span className="rounded-xl border border-brand-100 bg-brand-50 p-2 text-brand-600">
              <Hammer className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">45</h2>
            <p className="ml-2 text-sm font-medium text-slate-400">Ordres Ac.</p>
          </div>
          <div className="mt-5 relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="absolute left-0 top-0 h-full w-[70%] rounded-full bg-brand-500"></div>
          </div>
          <p className="mt-2 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            70% Capacité
          </p>
        </div>

        {/* KPI 3 */}
        <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-red-50 opacity-50 transition-transform group-hover:scale-110"></div>
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-slate-500">Alertes Retards</p>
            <span className="rounded-xl border border-red-100 bg-red-50 p-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">3</h2>
            <p className="ml-2 text-sm font-medium text-slate-400">Com.</p>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="flex items-center rounded bg-red-50 px-2 py-0.5 font-bold text-red-600">
              Intervention requise !
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-orange-50 opacity-50 transition-transform group-hover:scale-110"></div>
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-slate-500">Factures Bloquées</p>
            <span className="rounded-xl border border-orange-100 bg-orange-50 p-2 text-orange-500">
              <FileClock className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">82.3 K€</h2>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="flex items-center font-medium text-slate-600">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></span> 14 factures en attente
            </span>
          </div>
        </div>
      </div>

      {/* PIPELINE DE COMMANDE (STEPPER) */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <div className="absolute left-0 top-0 h-full w-1 bg-brand-500"></div>

        <div className="mb-10 flex flex-col justify-between pl-2 md:flex-row md:items-center">
          <div>
            <div className="mb-1 flex items-center space-x-3">
              <span className="flex items-center rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                <Flame className="mr-1 h-3 w-3" /> Priorité Haute
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Suivi d'Affaire #AF-26-042</h3>
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              Appareil Carénage - <span className="text-slate-700">AeroSpace Group</span>
            </p>
          </div>
          <button className="flex items-center mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 md:mt-0">
            Détails Commande <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="relative px-2 md:px-8">
          {/* Progress Track */}
          <div className="absolute left-8 right-8 top-6 h-[3px] rounded-full bg-slate-100"></div>
          {/* Active Track */}
          <div
            className="absolute left-8 top-6 h-[3px] rounded-full bg-brand-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
            style={{ width: '50%' }}
          ></div>

          {/* Steps Wrapper */}
          <div className="relative z-10 flex justify-between">
            {/* 1. Devis */}
            <div className="flex w-24 flex-col items-center">
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-brand-600 text-white shadow-sm ring-1 ring-brand-100 transition-transform hover:scale-110">
                <Check className="h-5 w-5" />
              </div>
              <span className="mt-3 text-[13px] font-bold text-slate-800">Devis</span>
              <span className="mt-1 text-[11px] font-semibold text-emerald-600">Validé</span>
            </div>

            {/* 2. Appro */}
            <div className="flex w-24 flex-col items-center">
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-brand-600 text-white shadow-sm ring-1 ring-brand-100 transition-transform hover:scale-110">
                <Check className="h-5 w-5" />
              </div>
              <span className="mt-3 text-[13px] font-bold text-slate-800">Appro.</span>
              <span className="mt-1 text-[11px] font-semibold text-emerald-600">Acier Reçu</span>
            </div>

            {/* 3. Fabrication (Active) */}
            <div className="flex w-24 flex-col items-center">
              <div className="relative step-pulse rounded-full">
                <div className="relative z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-brand-600 bg-white text-brand-600 shadow-sm">
                  <Settings2 className="h-5 w-5 animate-[spin_4s_linear_infinite]" />
                </div>
              </div>
              <span className="mt-3 text-[13px] font-bold text-brand-600">Fabrication</span>
              <span className="mt-1 rounded border border-brand-200 bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-600">
                Usinage CNC
              </span>
            </div>

            {/* 4. Livraison */}
            <div className="flex w-24 cursor-not-allowed flex-col items-center opacity-40 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-sm">
                <Truck className="h-5 w-5" />
              </div>
              <span className="mt-3 text-[13px] font-bold text-slate-500">Expédition</span>
              <span className="mt-1 text-[11px] font-medium text-slate-400">Prévu 28/02</span>
            </div>

            {/* 5. Facture */}
            <div className="flex w-24 cursor-not-allowed flex-col items-center opacity-40 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-sm">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <span className="mt-3 text-[13px] font-bold text-slate-500">Facturation</span>
              <span className="mt-1 text-[11px] font-medium text-slate-400">En attente</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABLEAU DE SUIVI DE PRODUCTION */}
      <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        {/* Table Toolbar */}
        <div className="flex flex-col border-b border-slate-200/60 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Ordres de Fabrication (OF) en cours</h3>
            <p className="font-medium text-sm text-slate-500">Programme pour la semaine S08</p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher OF..."
                className="w-48 rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none transition-all hover:bg-slate-50 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <button className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <th className="px-6 py-4">Client & Dossier</th>
                <th className="px-6 py-4">Référence / Plan</th>
                <th className="px-6 py-4">Statut Process.</th>
                <th className="px-6 py-4">SLA / Date Limite</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {/* ROW 1: En cours */}
              <tr className="group cursor-default transition-colors hover:bg-brand-50/40">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-dark-900 text-[10px] font-bold text-white shadow-sm">
                      AS
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 transition-colors group-hover:text-brand-600">
                        AeroSpace Group
                      </div>
                      <div className="font-mono text-[11px] font-semibold text-slate-400 mt-0.5">
                        #OF-26-089
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center font-medium text-slate-700">
                    <FileCog className="mr-2 h-4 w-4 text-slate-400 transition-colors group-hover:text-brand-500" />
                    Tuyère TR-45 v2
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md border border-orange-200 bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-700">
                    <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500"></span>
                    Usinage (55%)
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700">28 Fév 2026</div>
                  <div className="mt-0.5 text-[11px] font-semibold text-orange-600">
                    Reste 6 jours
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded p-2 text-slate-400 transition hover:bg-brand-50 hover:text-brand-600">
                      <FileDown className="h-4 w-4" />
                    </button>
                    <button className="rounded p-2 text-slate-400 transition hover:bg-slate-100 hover:text-dark-800">
                      <PenLine className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* ROW 2: Terminé / Payé */}
              <tr className="group cursor-default transition-colors hover:bg-brand-50/40">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-[10px] font-bold text-white shadow-sm">
                      RM
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 transition-colors group-hover:text-brand-600">
                        RoboMed SA
                      </div>
                      <div className="font-mono text-[11px] font-semibold text-slate-400 mt-0.5">
                        #OF-26-088
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center font-medium text-slate-700">
                    <FileCog className="mr-2 h-4 w-4 text-slate-400 transition-colors group-hover:text-brand-500" />
                    Bras Articulé Titane
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                    Terminé & Livré
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-500 line-through">22 Fév 2026</div>
                  <div className="mt-0.5 text-[11px] font-bold text-emerald-600">Clôturé</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded p-2 text-slate-400 transition hover:bg-brand-50 hover:text-brand-600">
                      <FileDown className="h-4 w-4" />
                    </button>
                    <button className="rounded p-2 text-slate-400 transition hover:bg-slate-100 hover:text-dark-800">
                      <PenLine className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              {/* ROW 3: Retard (Rouge) */}
              <tr className="group cursor-default bg-red-50/30 transition-colors hover:bg-red-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-[10px] font-bold text-white shadow-sm">
                      MP
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 transition-colors group-hover:text-red-700">
                        Mécanique Précise
                      </div>
                      <div className="font-mono text-[11px] font-semibold text-slate-500 mt-0.5">
                        #OF-26-085
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center font-medium text-slate-700">
                    <FileWarning className="mr-2 h-4 w-4 text-red-500" />
                    Carter Moteur Fonte
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md border border-red-200 bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700">
                    <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                    Bloqué (Matière)
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-red-600">20 Fév 2026</div>
                  <div className="mt-0.5 flex items-center text-[11px] font-bold text-red-600">
                    Retard 2 jours
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                      <FileDown className="h-4 w-4" />
                    </button>
                    <button className="rounded p-2 text-slate-400 transition hover:bg-slate-100 hover:text-dark-800">
                      <PenLine className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
