import React from 'react';
import { PackageSearch, Search, Truck, Download, MapPin } from 'lucide-react';

export default function ExpeditionsPage() {
    return (
        <div className="space-y-8">
            {/* Page Title Area */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <div className="mb-2 flex items-center space-x-2">
                        <span className="rounded border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600">
                            Logistique
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
                        Expéditions & BL
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Préparez les livraisons, générez les Bons de Livraison et suivez les transporteurs.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex transform items-center rounded-lg bg-dark-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-dark-900/10 transition-transform hover:-translate-y-0.5 hover:bg-slate-800">
                        <Truck className="mr-2 h-4 w-4" /> Générer un BL
                    </button>
                </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-hidden">
                <div className="flex flex-col border-b border-slate-200/60 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Bons de livraison récents</h3>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="N° BL ou Client..."
                                className="w-48 rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none transition-all hover:bg-slate-50 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                <th className="px-6 py-4">N° Document</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Transporteur</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {/* DUMMY ROW 1 */}
                            <tr className="group cursor-default transition-colors hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="font-mono font-bold text-slate-800">BL-26-402</div>
                                    <div className="text-[11px] font-medium text-slate-400">il y a 2 heures</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-slate-800">RoboMed SA</div>
                                    <div className="flex items-center text-[11px] font-medium text-slate-500 mt-1">
                                        <MapPin className="w-3 h-3 mr-1" /> Genève, CH
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-700">DHL Express</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-md border border-brand-200 bg-brand-50 px-2 py-1 text-[11px] font-bold text-brand-700">
                                        Enlèvement prévu
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-brand-600 transition-colors p-2"><Download className="w-4 h-4" /></button>
                                </td>
                            </tr>

                            {/* DUMMY ROW 2 */}
                            <tr className="group cursor-default transition-colors hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="font-mono font-bold text-slate-800">BL-26-401</div>
                                    <div className="text-[11px] font-medium text-slate-400">Hier</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-slate-800">AeroSpace Group</div>
                                    <div className="flex items-center text-[11px] font-medium text-slate-500 mt-1">
                                        <MapPin className="w-3 h-3 mr-1" /> Toulouse, FR
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-700">Geodis</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                                        Expédié
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-brand-600 transition-colors p-2"><Download className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
