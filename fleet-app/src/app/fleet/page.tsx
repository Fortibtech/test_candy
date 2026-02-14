import { Plus } from 'lucide-react'
import Link from 'next/link'

// Mock Data
const vehicles = [
    { id: 1, plate: 'AB-123-CD', type: 'Tracteur', brand: 'Renault Trucks', health: 92, status: 'En route' },
    { id: 2, plate: 'EF-456-GH', type: 'Porteur', brand: 'Mercedes-Benz', health: 45, status: 'Maintenance' },
    { id: 3, plate: 'IJ-789-KL', type: 'Remorque', brand: 'Schmitz', health: 88, status: 'Disponible' },
    { id: 4, plate: 'MN-012-OP', type: 'Tracteur', brand: 'Volvo', health: 76, status: 'En route' },
    { id: 5, plate: 'QR-345-ST', type: 'Porteur', brand: 'Iveco', health: 15, status: 'Panne' },
    { id: 6, plate: 'UV-678-WX', type: 'Tracteur', brand: 'Scania', health: 98, status: 'Disponible' },
]

export default function FleetPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Ma Flotte</h1>
                    <p className="text-slate-500">Gestion des véhicules et état de santé.</p>
                </div>
                <Link
                    href="/fleet/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Ajouter un véhicule
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{vehicle.plate}</h3>
                                <p className="text-slate-500 text-sm">{vehicle.brand} - {vehicle.type}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold
                ${vehicle.status === 'En route' ? 'bg-blue-100 text-blue-700' :
                                    vehicle.status === 'Disponible' ? 'bg-green-100 text-green-700' :
                                        vehicle.status === 'Panne' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}
              `}>
                                {vehicle.status}
                            </span>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700">Santé du véhicule</span>
                                <span className={`font-bold ${vehicle.health > 80 ? 'text-green-600' :
                                        vehicle.health > 40 ? 'text-orange-600' : 'text-red-600'
                                    }`}>{vehicle.health}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full transition-all duration-500 ${vehicle.health > 80 ? 'bg-green-500' :
                                            vehicle.health > 40 ? 'bg-orange-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${vehicle.health}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                            <button className="flex-1 text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded font-medium transition-colors border border-slate-200">
                                Détails
                            </button>
                            <button className="flex-1 text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded font-medium transition-colors border border-slate-200">
                                Maintenance
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
