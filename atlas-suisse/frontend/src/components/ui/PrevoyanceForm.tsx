'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Calculator, PiggyBank, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;
    return (
        <div className="w-full bg-atlas-pearl h-[2px] mt-6 mb-12 overflow-hidden mx-auto max-w-sm rounded-full">
            <motion.div
                className="h-full bg-atlas-blue rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
        </div>
    );
}

export function PrevoyanceForm() {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        statutCivil: '',
        age: '',
        canton: '',
        objectifPrincipal: '',
        revenuAnnuel: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        nLpdConsent: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const setObjectiveAndNext = (obj: string) => {
        setFormData(prev => ({ ...prev, objectifPrincipal: obj }));
        setTimeout(handleNext, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:3001/prevoyance/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    age: Number(formData.age),
                    revenuAnnuel: Number(formData.revenuAnnuel),
                }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Une erreur est survenue lors de la soumission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants: import('framer-motion').Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
    };

    const step2Options = [
        { id: 'Optimiser mes impôts', icon: <Calculator className="w-6 h-6 stroke-[1.2]" />, label: 'Optimiser mes impôts' },
        { id: 'Préparer ma retraite', icon: <PiggyBank className="w-6 h-6 stroke-[1.2]" />, label: 'Préparer ma retraite' },
        { id: 'Protéger ma famille', icon: <Briefcase className="w-6 h-6 stroke-[1.2]" />, label: 'Protéger ma famille' }
    ];

    if (result) {
        return (
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-xl mx-auto p-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
                <h2 className="text-3xl font-serif text-atlas-blue mb-4">Demande Transmise avec Succès</h2>
                <p className="text-gray-600 mb-8 font-normal">{result.message}</p>

                <div className="bg-atlas-pearl/30 p-8 rounded-lg text-left mb-8 border border-atlas-pearl/50">
                    <p className="text-sm font-semibold text-atlas-blue mb-3">Simulations Résultat :</p>
                    <p className="text-sm text-gray-600 font-light"><strong>Scoring:</strong> <span className="text-atlas-gold font-medium">{result.scoring}/100</span></p>
                    <p className="text-sm text-gray-600 font-normal mt-3"><strong>Log Chiffrement AES-256:</strong><br /> <span className="font-mono text-xs text-gray-500 break-all">{result.demonstration.encryptedStringLog}</span></p>
                </div>

                <button onClick={() => window.location.reload()} className="px-8 py-4 bg-atlas-blue text-white rounded-md hover:bg-atlas-blue/90 transition-all duration-300 uppercase tracking-widest text-xs font-medium shadow-[0_4px_14px_0_rgba(11,19,43,0.2)] hover:shadow-[0_6px_20px_rgba(11,19,43,0.23)]">
                    Nouvelle Simulation
                </button>
            </motion.div>
        );
    }

    // Define input classes to keep them consistent and premium
    const inputContainerClass = "mb-8 text-left";
    const labelClass = "block text-xs uppercase tracking-widest text-atlas-blue/70 mb-2 font-semibold";
    const inputClass = "w-full bg-transparent border-b border-atlas-pearl py-3 text-xl font-medium focus:outline-none focus:border-atlas-gold transition-colors text-atlas-blue placeholder:text-gray-400";

    return (
        <div className="min-h-[85vh] flex flex-col justify-between max-w-4xl mx-auto w-full px-6 py-8">

            {/* 1. Header: Minimalist Logo & Ultra-thin indicator */}
            <header className="pt-8 pb-4 text-center">
                <div className="mb-8 flex justify-center items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-atlas-blue flex items-center justify-center shadow-sm">
                        <span className="text-white font-serif text-xl font-bold">A</span>
                    </div>
                    <span className="font-serif text-2xl tracking-wide text-atlas-blue">ATLAS <span className="text-atlas-gold italic font-light">Suisse</span></span>
                </div>
                <div className="text-xs tracking-widest text-atlas-blue/60 font-semibold uppercase mb-3">Étape {step} / {totalSteps}</div>
                <ProgressBar currentStep={step} totalSteps={totalSteps} />
            </header>

            {/* 2. Body */}
            <main className="flex-grow flex flex-col items-center justify-center pb-12 w-full max-w-3xl mx-auto">
                <form className="w-full" onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full text-center"
                        >
                            {/* STEP 1: Situation */}
                            {step === 1 && (
                                <div className="w-full max-w-md mx-auto">
                                    <h2 className="text-3xl md:text-4xl font-serif text-atlas-blue mb-12 font-normal leading-relaxed tracking-tight">
                                        Quelle est votre <span className="italic text-atlas-gold">situation actuelle</span> ?
                                    </h2>

                                    <div className={inputContainerClass}>
                                        <label className={labelClass}>Statut Civil</label>
                                        <select name="statutCivil" value={formData.statutCivil} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
                                            <option value="" disabled>Sélectionnez...</option>
                                            <option value="Célibataire">Célibataire</option>
                                            <option value="Marié">Marié(e)</option>
                                            <option value="Divorcé">Divorcé(e)</option>
                                            <option value="Veuf">Veuf(ve)</option>
                                        </select>
                                    </div>

                                    <div className={inputContainerClass}>
                                        <label className={labelClass}>Âge</label>
                                        <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="100" className={inputClass} placeholder="Ex: 35" />
                                    </div>

                                    <div className={inputContainerClass}>
                                        <label className={labelClass}>Canton de résidence</label>
                                        <select name="canton" value={formData.canton} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
                                            <option value="" disabled>Sélectionnez...</option>
                                            <option value="VD">Vaud</option>
                                            <option value="GE">Genève</option>
                                            <option value="VS">Valais</option>
                                            <option value="FR">Fribourg</option>
                                            <option value="NE">Neuchâtel</option>
                                            <option value="JU">Jura</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: The Core Question */}
                            {step === 2 && (
                                <div className="w-full">
                                    <h2 className="text-3xl md:text-4xl font-serif text-atlas-blue mb-16 font-normal leading-relaxed tracking-tight">
                                        Quel est votre <span className="italic text-atlas-gold">objectif principal</span><br /> pour votre 3ème pilier ?
                                    </h2>

                                    {/* 3. Options: 3 Interactive Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
                                        {step2Options.map((opt) => {
                                            const isSelected = formData.objectifPrincipal === opt.id;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => setObjectiveAndNext(opt.id)}
                                                    className={`
                            relative flex flex-col items-center justify-center px-6 py-10 h-56 rounded-2xl
                            transition-all duration-400 ease-out border bg-white
                            ${isSelected
                                                            ? 'border-atlas-gold shadow-[0_12px_40px_rgb(212,175,55,0.12)] -translate-y-1'
                                                            : 'border-transparent shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-atlas-pearl hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5'}
                          `}
                                                >
                                                    <div className={`mb-6 p-4 rounded-full transition-colors duration-400 ${isSelected ? 'bg-atlas-gold/10 text-atlas-gold' : 'bg-gray-50 text-atlas-blue group-hover:bg-atlas-pearl/40'}`}>
                                                        {opt.icon}
                                                    </div>
                                                    <span className={`text-base font-semibold transition-colors duration-400 ${isSelected ? 'text-atlas-gold' : 'text-atlas-blue'}`}>
                                                        {opt.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Revenus */}
                            {step === 3 && (
                                <div className="w-full max-w-md mx-auto">
                                    <h2 className="text-3xl md:text-4xl font-serif text-atlas-blue mb-16 font-normal leading-relaxed tracking-tight">
                                        Quels sont vos <span className="italic text-atlas-gold">revenus annuels</span> ?
                                    </h2>

                                    <div className={inputContainerClass}>
                                        <label className={labelClass}>Revenu annuel brut estimé (CHF)</label>
                                        <input type="number" name="revenuAnnuel" value={formData.revenuAnnuel} onChange={handleChange} required min="0" step="1000" className={`${inputClass} text-3xl text-center`} placeholder="Ex: 120000" />
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: Coordonnées & nLPD */}
                            {step === 4 && (
                                <div className="w-full max-w-lg mx-auto">
                                    <h2 className="text-3xl md:text-4xl font-serif text-atlas-blue mb-12 font-normal leading-relaxed tracking-tight">
                                        Vos <span className="italic text-atlas-gold">coordonnées</span> sécurisées
                                    </h2>

                                    <div className="grid grid-cols-2 gap-x-8 gap-y-0 text-left">
                                        <div className={inputContainerClass}>
                                            <label className={labelClass}>Prénom</label>
                                            <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className={inputClass} placeholder="Jean" />
                                        </div>
                                        <div className={inputContainerClass}>
                                            <label className={labelClass}>Nom</label>
                                            <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className={inputClass} placeholder="Dupont" />
                                        </div>
                                    </div>

                                    <div className={inputContainerClass}>
                                        <label className={labelClass}>Adresse courriel</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="jean.dupont@email.ch" />
                                    </div>

                                    <div className={inputContainerClass}>
                                        <label className={labelClass}>Téléphone</label>
                                        <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className={inputClass} placeholder="079 123 45 67" />
                                    </div>

                                    <div className="mt-10 p-6 bg-atlas-pearl/20 rounded-xl border border-atlas-pearl/50 flex items-start space-x-4 text-left">
                                        <input type="checkbox" name="nLpdConsent" checked={formData.nLpdConsent} onChange={handleChange} required id="nLpdConsent" className="mt-1 flex-shrink-0 accent-atlas-gold w-4 h-4 cursor-pointer rounded-sm" />
                                        <label htmlFor="nLpdConsent" className="text-xs text-gray-600 font-normal leading-relaxed cursor-pointer">
                                            Je consens au traitement de mes données conformément à la <strong>nouvelle Loi sur la Protection des Données (nLPD)</strong>. Vos informations sont chiffrées (AES-256) et restent strictement confidentielles au sein de notre cabinet en Suisse.
                                        </label>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>

                    {/* Minimalist Navigation (Clear but Non-Aggressive) */}
                    <div className={`mt-16 flex items-center ${step > 1 ? 'justify-between' : 'justify-end'} max-w-3xl mx-auto w-full border-t border-atlas-pearl pt-8`}>
                        {step > 1 && (
                            <button type="button" onClick={handlePrev} disabled={isSubmitting} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-atlas-blue/60 hover:text-atlas-blue transition-colors group disabled:opacity-50">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Retour
                            </button>
                        )}

                        {(step !== 2 || formData.objectifPrincipal) && (
                            <button
                                type="submit"
                                disabled={isSubmitting || (step === 2 && !formData.objectifPrincipal)}
                                className="flex items-center gap-3 px-8 py-3.5 bg-atlas-blue text-white rounded-lg hover:bg-atlas-blue/90 transition-all duration-300 uppercase tracking-widest text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(11,19,43,0.1)] hover:shadow-[0_6px_20px_rgba(11,19,43,0.2)] ml-auto"
                            >
                                {step === totalSteps ? (isSubmitting ? 'Chiffrement...' : 'Confirmer') : 'Continuer'}
                                {step !== totalSteps && <ArrowRight className="w-4 h-4" />}
                            </button>
                        )}
                    </div>
                </form>
            </main>

            {/* 4. Footer: Reassurance Block */}
            <footer className="py-6 mt-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs uppercase tracking-wider text-atlas-blue/50 font-semibold">
                    <div className="flex items-center space-x-2.5">
                        <Shield className="w-3.5 h-3.5 stroke-[2]" />
                        <span>Infrastructure sécurisée aux normes nLPD suisse</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center space-x-2.5">
                        <Lock className="w-3.5 h-3.5 stroke-[2]" />
                        <span>Chiffrement AES-256 actif</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
