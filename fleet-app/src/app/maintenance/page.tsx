import { Calendar, Wrench, CheckCircle, Clock } from 'lucide-react'

// Mock Data
const maintenances = [
    { id: 1, vehicle: 'AB-123-CD', type: 'Vidange', date: '15/03/2026', status: 'Planifié', cost: '350€' },
    { id: 2, vehicle: 'EF-456-GH', type: 'Freins', date: '10/02/2026', status: 'Terminé', cost: '1200€' },
    { id: 3, vehicle: 'IJ-789-KL', type: 'Pneumatiques', date: '28/02/2026', status: 'En cours', cost: '800€' },
    { id: 4, vehicle: 'MN-012-OP', type: 'Contrôle Technique', date: '05/04/2026', status: 'Planifié', cost: '150€' },
]

export default function MaintenancePage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Entretiens & Maintenance</h1>
                    <p className="text-slate-500">Suivi des interventions techniques.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
                    <Wrench size={20} />
                    Nouvelle intervention
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Interventions ce mois</p>
                        <p className="text-2xl font-bold text-slate-900">8</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">En attente</p>
                        <p className="text-2xl font-bold text-slate-900">3</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Coût total (YTD)</p>
                        <p className="text-2xl font-bold text-slate-900">4,250€</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Véhicule</th>
                            <th className="px-6 py-4">Type d'intervention</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Coût</th>
                            <th className="px-6 py-4">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {maintenances.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{item.vehicle}</td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4 font-medium">{item.cost}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${item.status === 'En cours' ? 'bg-orange-100 text-orange-700' :
                                            item.status === 'Terminé' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                  `}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
