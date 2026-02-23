import React from 'react';
import { Calendar as CalendarIcon, Filter, Layers, Plus } from 'lucide-react';

export default function PlanificationPage() {
    return (
        <div className="space-y-8">
            {/* Page Title Area */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-2 flex items-center space-x-2">
                        <span className="rounded border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600">
                            Atelier
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
                        Planification & Ordonnancement
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gérez la charge machine et le planning des équipes de production.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
                        <CalendarIcon className="mr-2 h-4 w-4" /> Vue Semaine
                    </button>
                </div>
            </div>

            {/* Placeholder Gantt / Planning */}
            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-hidden min-h-[500px]">
                <div className="flex flex-col border-b border-slate-200/60 bg-slate-50/50 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-sm font-bold text-slate-800">Semaine 08 - Février 2026</h3>
                        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-brand-500 mr-1"></div> Usinage CNC</span>
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div> Montage</span>
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div> Finition</span>
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                        <button className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
                            <Filter className="h-4 w-4 mr-2" /> Postes de charge
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/20">
                    <div className="relative mb-6">
                        <Layers className="mx-auto h-16 w-16 text-slate-300" />
                        <CalendarIcon className="absolute bottom-0 right-0 h-6 w-6 text-brand-500 bg-white rounded-full p-1 shadow-sm" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Planning Interactif</h3>
                    <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                        La vue Gantt complète sera intégrée ici (ex: dhtmlxGantt ou composant Tailwind sur mesure) pour glisser-déposer les OF sur les machines.
                    </p>
                    <button className="mt-6 inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                        <Plus className="mr-2 h-4 w-4" />
                        Créer une tâche planifiée
                    </button>
                </div>
            </div>

        </div>
    );
}
