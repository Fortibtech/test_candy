import { Save } from 'lucide-react'

export default function SettingsPage() {
    return (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Paramètres</h1>
                <p className="text-slate-500">Configuration générale de l'application.</p>
            </div>

            <div className="space-y-8">
                {/* Profile Section */}
                <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Profil Administrateur</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                            <input type="text" defaultValue="John Doe" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input type="email" defaultValue="admin@novafleet.com" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rôle</label>
                            <select className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" disabled>
                                <option>Administrateur Flotte</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900">Alertes critiques par Email</p>
                                <p className="text-sm text-slate-500">Recevoir un email immédiat en cas de panne ou accident.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900">Rappels de maintenance hebdomadaires</p>
                                <p className="text-sm text-slate-500">Recevoir le résumé des entretiens chaque lundi.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
                        <Save size={20} />
                        Enregistrer les changements
                    </button>
                </div>
            </div>
        </div>
    )
}
