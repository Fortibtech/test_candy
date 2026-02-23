import React from 'react';
import { Lock, ShieldCheck, UserCircle, Fingerprint, Check, Clock } from 'lucide-react';

const FicheBeneficiaire = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
            {/* Header Sécurisé */}
            <div className="bg-secondary-50/50 px-6 py-4 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center space-x-3 text-secondary-800 font-medium">
                    <ShieldCheck className="w-5 h-5 text-secondary-600" />
                    <span>Fiche Sécurisée</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Chiffrement AES-256 Actif</span>
                </div>
            </div>

            {/* Contenu Fiche */}
            <div className="px-6 py-6 flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        <UserCircle className="w-12 h-12" />
                    </div>
                </div>

                <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-800">Dossier Anonymisé #4092</h2>
                            <p className="text-neutral-500 mt-1">Date d'ouverture : 12 Octobre 2024</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium bg-neutral-50 px-2 py-1 rounded">
                            <Fingerprint className="w-4 h-4" />
                            <span>Accès Restreint (Niveau 3)</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-50">
                        <h3 className="text-sm font-semibold text-neutral-600 mb-4">Progression du Parcours Type</h3>

                        {/* Workflow Visuel Horizontal */}
                        <div className="flex items-start justify-between relative mt-2">

                            {/* Ligne de connexion arrière */}
                            <div className="absolute top-4 left-[10%] right-[10%] h-[2px] bg-neutral-100 -z-0">
                                <div className="h-full bg-emerald-400 w-1/2"></div>
                            </div>

                            {/* Etape 1 */}
                            <div className="flex flex-col items-center flex-1 relative z-10 bg-white group">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 border-[3px] border-white shadow-sm transition-transform group-hover:scale-110">
                                    <Check className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-neutral-700">Accueil</span>
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full mt-1.5 font-medium">Terminé</span>
                            </div>

                            {/* Etape 2 */}
                            <div className="flex flex-col items-center flex-1 relative z-10 bg-white group">
                                <div className="w-8 h-8 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mb-2 border-[3px] border-white shadow-sm transition-transform group-hover:scale-110">
                                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-600 animate-pulse"></span>
                                </div>
                                <span className="text-xs font-semibold text-neutral-800">Juridique</span>
                                <span className="text-[10px] bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded-full mt-1.5 font-medium border border-secondary-100">En cours</span>
                            </div>

                            {/* Etape 3 */}
                            <div className="flex flex-col items-center flex-1 relative z-10 bg-white group opacity-70">
                                <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mb-2 border-[3px] border-white shadow-sm transition-transform group-hover:scale-110">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-neutral-500">Psy</span>
                                <span className="text-[10px] text-neutral-400 mt-1.5 font-medium">À venir</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FicheBeneficiaire;
