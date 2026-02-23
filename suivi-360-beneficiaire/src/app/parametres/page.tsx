export default function ParametresPage() {
    return (
        <div className="pb-12 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Paramètres du Compte</h1>
                <p className="text-neutral-500 mt-1">Gérer vos préférences et la sécurité de votre accès.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                    <h3 className="font-bold text-lg text-neutral-800 mb-4 border-b border-neutral-100 pb-2">Sécurité & Chiffrement</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-neutral-700 text-sm">Chiffrement AES-256 local</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Toutes vos notes sont chiffrées avant envoi.</p>
                            </div>
                            <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 opacity-60">
                    <h3 className="font-bold text-lg text-neutral-800 mb-4 border-b border-neutral-100 pb-2">Interface</h3>
                    <p className="text-sm text-neutral-500 italic">Thème défini par l'organisation (Serein & Professionnel).</p>
                </div>
            </div>
        </div>
    );
}
