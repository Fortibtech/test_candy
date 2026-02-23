import React from 'react';
import { FileCheck2, Filter, ReceiptText, Search, Plus, Download } from 'lucide-react';

export default function FacturationPage() {
    return (
        <div className="space-y-8">
            {/* Page Title Area */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-2 flex items-center space-x-2">
                        <span className="rounded border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600">
                            Comptabilité
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
                        Facturation & Règlements
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Suivi des factures émises, encours clients et relances.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
                        <Download className="mr-2 h-4 w-4" /> Export Comptable
                    </button>
                    <button className="flex transform items-center rounded-lg bg-dark-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-dark-900/10 transition-transform hover:-translate-y-0.5 hover:bg-slate-800">
                        <Plus className="mr-2 h-4 w-4" /> Nouvelle Facture
                    </button>
                </div>
            </div>

            {/* Factures List */}
            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-sm">
                <div className="flex flex-col border-b border-slate-200/60 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Registre des factures</h3>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Chercher N° ou client..."
                                className="w-48 rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none transition-all hover:bg-slate-50 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                            />
                        </div>
                        <button className="flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
                            <Filter className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="p-12 text-center">
                    <ReceiptText className="mx-auto h-12 w-12 text-slate-300" />
                    <h3 className="mt-4 text-sm font-bold text-slate-800">Comptabilité à jour</h3>
                    <p className="mt-1 text-sm text-slate-500">Générez une facture depuis un Ordre de Fabrication terminé.</p>
                </div>
            </div>
        </div>
    );
}
