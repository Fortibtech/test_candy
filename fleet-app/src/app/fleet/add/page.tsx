'use client'

import { useState } from 'react'
import { Check, ChevronRight, UploadCloud } from 'lucide-react'
import Link from 'next/link'

const steps = [
    { id: 1, name: 'Identification' },
    { id: 2, name: 'Détails Techniques' },
    { id: 3, name: 'Documents' },
]

export default function AddVehiclePage() {
    const [currentStep, setCurrentStep] = useState(1)

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1)
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <Link href="/fleet" className="text-sm text-slate-500 hover:text-blue-600 mb-2 inline-block">
                    &larr; Retour à la flotte
                </Link>
                <h1 className="text-2xl font-bold text-slate-800">Ajouter un Véhicule</h1>
            </div>

            {/* Stepper */}
            <div className="mb-10">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center bg-slate-50 px-2 lg:px-6">
                            {/* z-10 and bg-slate-50 to hide line behind */}
                            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors z-10
                ${currentStep >= step.id
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-white border-slate-300 text-slate-400'}
              `}>
                                {currentStep > step.id ? <Check size={20} /> : step.id}
                            </div>
                            <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? 'text-blue-900' : 'text-slate-400'}`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Identification du Véhicule</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Immatriculation</label>
                                <input type="text" placeholder="AB-123-CD" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Numéro VIN</label>
                                <input type="text" placeholder="17 caractères" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Type de véhicule</label>
                                <select className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                    <option>Tracteur</option>
                                    <option>Porteur</option>
                                    <option>Remorque</option>
                                    <option>Utilitaire</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Détails Techniques</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Marque</label>
                                <input type="text" placeholder="Renault, Volvo..." className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Modèle</label>
                                <input type="text" placeholder="T-High 520" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Année de mise en service</label>
                                <input type="number" placeholder="2023" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kilométrage actuel</label>
                                <input type="number" placeholder="km" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Documents Légaux</h2>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <UploadCloud size={48} className="text-slate-400 mb-4" />
                            <p className="text-lg font-medium text-slate-700">Glisser-déposer la Carte Grise ici</p>
                            <p className="text-sm text-slate-500 mt-1">ou cliquez pour parcourir (PDF, JPG, PNG)</p>
                        </div>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <UploadCloud size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-slate-700">Certificat d'assurance</p>
                                    <p className="text-xs text-slate-500">Obligatoire pour la mise en route</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-blue-600">Ajouter</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    className={`px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors
            ${currentStep === 1 ? 'invisible' : ''}
          `}
                >
                    Précédent
                </button>

                <button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                    {currentStep === 3 ? 'Terminer' : 'Suivant'}
                    {currentStep !== 3 && <ChevronRight size={18} />}
                </button>
            </div>
        </div>
    )
}
