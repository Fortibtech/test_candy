import React from 'react';
import { Plus, Download, FileText, Search, CreditCard, Clock, Filter, CheckCircle2 } from 'lucide-react';

export default function DevisVentesPage() {
    return (
        <div className="space-y-8">
            {/* Page Title Area */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-2 flex items-center space-x-2">
                        <span className="rounded border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600">
                            Commercial
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
                        Devis & Ventes
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gérez vos propositions commerciales et le tunnel de vente.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </button>
                    <button className="flex transform items-center rounded-lg bg-dark-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-dark-900/10 transition-transform hover:-translate-y-0.5 hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" /> Nouveau Devis
                    </button>
                </div>
            </div>

            {/* KPI Cards (Commercial focus) */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-500">Devis à relancer</p>
                        <span className="rounded-xl border border-orange-100 bg-orange-50 p-2 text-orange-500">
                            <Clock className="h-4 w-4" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">12</h2>
                        <p className="ml-2 text-sm font-medium text-slate-400">Pour 45K€</p>
                    </div>
                </div>
                <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-500">Taux de Conversion</p>
                        <span className="rounded-xl border border-brand-100 bg-brand-50 p-2 text-brand-600">
                            <CheckCircle2 className="h-4 w-4" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">68%</h2>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="mr-2 flex items-center rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600">
                            +5% ce mois
                        </span>
                    </div>
                </div>
                <div className="group relative rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <p className="text-sm font-semibold text-slate-500">Pipeline en cours</p>
                        <span className="rounded-xl border border-slate-100 bg-slate-50 p-2 text-slate-600">
                            <CreditCard className="h-4 w-4" />
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">1.2 M€</h2>
                    </div>
                </div>
            </div>

            {/* Liste des devis */}
            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-sm">
                <div className="flex flex-col border-b border-slate-200/60 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Propositions Récentes</h3>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Chercher client..."
                                className="w-48 rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none transition-all hover:bg-slate-50 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                            />
                        </div>
                        <button className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
                            <Filter className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-slate-300" />
                    <h3 className="mt-4 text-sm font-bold text-slate-800">Aucun devis affiché</h3>
                    <p className="mt-1 text-sm text-slate-500">Sélectionnez une période ou créez un nouveau devis.</p>
                    <button className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Créer le premier devis
                    </button>
                </div>
            </div>
        </div>
    );
}
