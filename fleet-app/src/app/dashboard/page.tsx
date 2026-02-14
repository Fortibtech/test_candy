import { Truck, AlertTriangle, Coins, Calendar } from 'lucide-react'

// Mock Data
const stats = [
    { label: 'Total Camions', value: '34', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'En Panne', value: '2', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'CA Mensuel', value: '124,500€', icon: Coins, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Entretiens à venir', value: '5', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
]

const upcomingMaintenance = [
    { id: 1, plate: 'AB-123-CD', type: 'Tracteur', deadline: '15/03/2026', status: 'Urgent' },
    { id: 2, plate: 'EF-456-GH', type: 'Porteur', deadline: '22/03/2026', status: 'Prévu' },
    { id: 3, plate: 'IJ-789-KL', type: 'Remorque', deadline: '05/04/2026', status: 'En attente' },
    { id: 4, plate: 'MN-012-OP', type: 'Tracteur', deadline: '12/04/2026', status: 'Prévu' },
]

export default function DashboardPage() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Tableau de Bord</h1>
                <p className="text-slate-500">Vue d'ensemble de la flotte.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            <stat.icon className={stat.color} size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Maintenance Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-800">Prochains Passages aux Mines</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Voir tout</button>
                </div>
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Immatriculation</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Échéance</th>
                            <th className="px-6 py-4">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {upcomingMaintenance.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{item.plate}</td>
                                <td className="px-6 py-4">{item.type}</td>
                                <td className="px-6 py-4">{item.deadline}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${item.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                                            item.status === 'Prévu' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
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
