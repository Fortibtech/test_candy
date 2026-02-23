import DashboardExtract from '@/components/DashboardExtract';

export default function StatistiquesPage() {
    return (
        <div className="pb-12 space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Statistiques Globales</h1>
                <p className="text-neutral-500 mt-1">Analyse des données et reporting pour les partenaires.</p>
            </div>

            {/* Réutilisation intelligente du Dashboard existant */}
            <DashboardExtract />
        </div>
    );
}
