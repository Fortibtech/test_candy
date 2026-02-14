import { AlertTriangle, Info, AlertOctagon } from 'lucide-react'

// Mock Data
const alerts = [
    { id: 1, title: 'Panne Moteur - Camion 34A', description: 'Signalé par le chauffeur. Nécessite remorquage.', priority: 'Critique', date: 'Aujourd\'hui, 10:30', icon: AlertOctagon, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 2, title: 'Assurance expirée - Remorque B99', description: 'Renouvellement urgent requis sous 48h.', priority: 'Haute', date: 'Hier', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 3, title: 'Maintenance préventive approchante', description: 'Véhicule AB-123-CD atteindra bientôt 50k km.', priority: 'Moyenne', date: '12/02/2026', icon: Info, color: 'text-blue-600', bg: 'bg-blue-50' },
]

export default function AlertsPage() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Alertes & Notifications</h1>
                <p className="text-slate-500">Suivi des incidents et rappels importants.</p>
            </div>

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`p-6 rounded-xl border border-slate-200 shadow-sm flex gap-6 ${alert.bg}`}>
                        <div className="shrink-0">
                            <alert.icon className={alert.color} size={32} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-slate-900">{alert.title}</h3>
                                <span className="text-sm text-slate-500">{alert.date}</span>
                            </div>
                            <p className="text-slate-600 mt-1">{alert.description}</p>
                            <div className="mt-3 flex gap-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border
                        ${alert.priority === 'Critique' ? 'border-red-200 text-red-700 bg-red-100' :
                                        alert.priority === 'Haute' ? 'border-orange-200 text-orange-700 bg-orange-100' : 'border-blue-200 text-blue-700 bg-blue-100'}
                     `}>
                                    {alert.priority}
                                </span>
                                <button className="text-sm font-medium text-slate-700 hover:text-slate-900 underline">
                                    Voir détails &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
