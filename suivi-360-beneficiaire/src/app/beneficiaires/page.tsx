export default function BeneficiairesPage() {
    return (
        <div className="pb-12 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Annuaire des Bénéficiaires</h1>
                <p className="text-neutral-500 mt-1">Gestion sécurisée des dossiers et des suivis.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-600 mb-4">
                    {/* Icône Users simplifiée */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h2 className="text-xl font-bold text-neutral-800 mb-2">Base de données chiffrée (AES-256)</h2>
                <p className="text-neutral-500 max-w-md mx-auto">
                    Pour des raisons de confidentialité, l&apos;annuaire complet n&apos;est accessible qu&apos;aux administrateurs habilités (Niveau 4).
                    Utilisez la barre de recherche globale pour trouver un dossier précis via son identifiant anonymisé.
                </p>
            </div>
        </div>
    );
}
