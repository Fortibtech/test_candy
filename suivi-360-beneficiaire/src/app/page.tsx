import React from 'react';
import FicheBeneficiaire from '@/components/FicheBeneficiaire';
import DashboardExtract from '@/components/DashboardExtract';
import SaisieRapide from '@/components/SaisieRapide';
import Timeline, { TimelineEventProps } from '@/components/Timeline';

const mockEvents: TimelineEventProps[] = [
  {
    date: '12 Octobre 2024',
    title: 'Premier Accueil',
    description: 'Ouverture du dossier d\'accompagnement. Évaluation initiale des besoins et mise en sécurité.',
    status: 'completed',
  },
  {
    date: '18 Octobre 2024',
    title: 'Entretien Juridique',
    description: 'Dépôt de plainte et rencontre avec Me. Dubois pour les démarches de protection.',
    status: 'completed',
  },
  {
    date: '02 Novembre 2024',
    title: 'Suivi Psychologique',
    description: 'Première séance avec Dr. Sarah L. au centre d\'accueil.',
    status: 'completed',
  },
  {
    date: '15 Novembre 2024',
    title: 'Groupe de Parole',
    description: 'Participation prévue au groupe de parole hebdomadaire.',
    status: 'current',
  },
  {
    date: '05 Décembre 2024',
    title: 'Point d\'étape Juridique',
    status: 'upcoming',
  }
];

export default function Home() {
  return (
    <div className="pb-12 space-y-8">
      {/* En-tête Page */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Vue d&apos;ensemble</h1>
        <p className="text-neutral-500 mt-1">Données agrégées et reporting ultra-sécurisé.</p>
      </div>

      {/* Dashboard Extraction (KPI Focus Partenaires) */}
      <DashboardExtract />

      {/* Grille Principale (Fiche + Timeline VS Saisie) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Colonne Gauche (Infos & Historique) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <FicheBeneficiaire />

          <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden flex-1">
            <div className="px-6 py-5 border-b border-neutral-100 bg-neutral-50/50">
              <h3 className="text-lg font-bold text-neutral-800">Parcours & Historique Récent</h3>
              <p className="text-sm text-neutral-500">Chronologie de l&apos;accompagnement d&apos;Exemple #4092.</p>
            </div>
            <div className="p-6">
              <Timeline events={mockEvents} />
            </div>
          </div>
        </div>

        {/* Colonne Droite (Saisie Rapide) */}
        <div className="lg:col-span-4 sticky top-24 h-fit">
          <SaisieRapide />
        </div>
      </div>

    </div>
  );
}
