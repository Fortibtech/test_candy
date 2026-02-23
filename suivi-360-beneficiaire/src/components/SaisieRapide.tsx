"use client";
import React, { useState } from 'react';
import { Send, Clock, BookOpen, HeartHandshake, Mic } from 'lucide-react';

const SaisieRapide = () => {
    const [note, setNote] = useState('');

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-primary-50 p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                        Zone de Saisie Rapide
                    </h2>
                    <p className="text-sm text-neutral-500">Notes d&apos;entretien sauvegardées et chiffrées à la volée</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Sauvegarde active
                </div>
            </div>

            <div className="space-y-4">
                {/* Catégories Rapides */}
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors border border-primary-100">
                        <HeartHandshake className="w-4 h-4" /> Entretien Psycho
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-50 text-secondary-700 text-sm font-medium hover:bg-secondary-100 transition-colors border border-secondary-100">
                        <BookOpen className="w-4 h-4" /> Point Juridique
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-50 text-neutral-600 text-sm font-medium hover:bg-neutral-100 transition-colors border border-neutral-200">
                        Autre
                    </button>
                </div>

                {/* Zone de texte */}
                <div className="relative">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-4 min-h-[140px] text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent resize-none transition-all"
                        placeholder="Tapez ici les points clés de l'entretien. Le texte est chiffré localement avant envoi..."
                    />
                    <button
                        className="absolute bottom-4 right-4 p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                        title="Dictée vocale sécurisée"
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                </div>

                {/* Actions inférieures */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-4 text-xs text-neutral-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Brouillon enregistré à 14:02</span>
                    </div>
                    <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition-transform active:scale-95">
                        <Send className="w-4 h-4" />
                        Soumettre la note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaisieRapide;
