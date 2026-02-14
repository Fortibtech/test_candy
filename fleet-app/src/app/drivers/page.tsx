import { Users, Phone, Mail, Award } from 'lucide-react'

// Mock Data
const drivers = [
    { id: 1, name: 'Jean Dupont', license: 'Permis CE', phone: '06 12 34 56 78', status: 'En mission', rating: 4.8 },
    { id: 2, name: 'Michel Martin', license: 'Permis C', phone: '06 98 76 54 32', status: 'Repos', rating: 4.5 },
    { id: 3, name: 'Pierre Durand', license: 'Permis CE', phone: '06 11 22 33 44', status: 'Disponible', rating: 5.0 },
]

export default function DriversPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Chauffeurs</h1>
                    <p className="text-slate-500">Gestion des conducteurs et plannings.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
                    <Users size={20} />
                    Ajouter un chauffeur
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                    <div key={driver.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                                    {driver.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{driver.name}</h3>
                                    <p className="text-sm text-slate-500">{driver.license}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${driver.status === 'En mission' ? 'bg-blue-100 text-blue-700' :
                                    driver.status === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                  `}>
                                {driver.status}
                            </span>
                        </div>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <Phone size={16} className="text-slate-400" />
                                {driver.phone}
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <Mail size={16} className="text-slate-400" />
                                {driver.name.toLowerCase().replace(' ', '.')}@novafleet.com
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <Award size={16} className="text-yellow-500" />
                                Note: {driver.rating}/5
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100">
                            <button className="w-full text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded font-medium transition-colors border border-slate-200">
                                Voir le profil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
