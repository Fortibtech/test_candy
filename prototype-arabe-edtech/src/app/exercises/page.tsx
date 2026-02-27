"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    Mic,
    Flame,
    ArrowRight,
    Keyboard,
    Layout,
    Mic2,
    Volume2,
    RefreshCw
} from "lucide-react";

// Types
type ExerciseType = "keyboard" | "builder" | "voice";

interface Exercise {
    id: number;
    type: ExerciseType;
    instructions: string;
    target: string;
    translation: string;
    options?: string[];
}

const EXERCISES: Exercise[] = [
    {
        id: 1,
        type: "keyboard",
        instructions: "Traduisez la phrase suivante en arabe :",
        target: "هذا كتاب",
        translation: "C'est un livre",
    },
    {
        id: 2,
        type: "builder",
        instructions: "Reconstruisez la phrase dans le bon ordre :",
        target: "هَٰذَا كِتَابٌ",
        translation: "C'est un livre (Sentence Builder)",
        options: ["كِتَابٌ", "هَٰذَا"],
    },
    {
        id: 3,
        type: "voice",
        instructions: "Prononcez la phrase à haute voix :",
        target: "هذا كتاب",
        translation: "C'est un livre",
    }
];

export default function ExercisePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [builderSelection, setBuilderSelection] = useState<string[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [voiceText, setVoiceText] = useState("");
    const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
    const [progress, setProgress] = useState(0);
    const [streak, setStreak] = useState(5); // Default start streak

    const currentExercise = EXERCISES[currentStep];

    // Logic for validation
    const validateExercise = () => {
        let isCorrect = false;

        if (currentExercise.type === "keyboard") {
            // Normalize specific characters and spaces
            const normalizedInput = inputValue.trim().replace(/\s+/g, ' ');
            const normalizedTarget = currentExercise.target.trim().replace(/\s+/g, ' ');
            isCorrect = normalizedInput === normalizedTarget;
        } else if (currentExercise.type === "builder") {
            isCorrect = builderSelection.join(" ") === currentExercise.target;
        } else if (currentExercise.type === "voice") {
            // Basic voice matching (Speech API is sometimes fuzzy)
            isCorrect = voiceText.includes("هذا") && voiceText.includes("كتاب");
        }

        if (isCorrect) {
            setFeedback("success");
            setProgress(((currentStep + 1) / EXERCISES.length) * 100);
            setStreak(prev => prev + 1);

            // Delay to next exercise
            setTimeout(() => {
                if (currentStep < EXERCISES.length - 1) {
                    setCurrentStep(prev => prev + 1);
                    resetStates();
                } else {
                    // Completed all
                    alert("Félicitations ! Vous avez terminé ce module.");
                }
            }, 1500);
        } else {
            setFeedback("error");
            // Reset after animation
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    const resetStates = () => {
        setInputValue("");
        setBuilderSelection([]);
        setVoiceText("");
        setIsRecording(false);
        setFeedback(null);
    };

    // Web Speech API
    const startSpeech = () => {
        if (typeof window !== 'undefined' && !('webkitSpeechRecognition' in window)) {
            alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'ar-SA';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event: any) => {
            const result = event.results[0][0].transcript;
            setVoiceText(result);
            setIsRecording(false);
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);

        recognition.start();
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-emerald-100 p-4 md:p-8">
            {/* Global CSS for Amiri Font */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        
        .font-amiri {
          font-family: 'Amiri', serif;
        }
      `}</style>

            <div className="max-w-xl mx-auto">

                {/* Header / Gamification */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex-1 mr-6">
                        <div className="h-3 w-full bg-emerald-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-orange-100">
                        <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                        <span className="font-bold text-orange-700">{streak}</span>
                    </div>
                </div>

                {/* Instructions */}
                <header className="mb-10 text-center">
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Exercice {currentStep + 1}</p>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">{currentExercise.instructions}</h1>
                    <p className="text-emerald-700/60 font-medium italic">"{currentExercise.translation}"</p>
                </header>

                {/* Exercise Area */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden"
                >
                    {/* Success Overlay */}
                    <AnimatePresence>
                        {feedback === "success" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-emerald-500/95 flex flex-col items-center justify-center z-50 text-white"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    transition={{ type: "spring", damping: 12 }}
                                >
                                    <CheckCircle2 className="w-24 h-24 mb-4" />
                                </motion.div>
                                <h2 className="text-3xl font-black">Excellent !</h2>
                                <p className="font-medium opacity-90 mt-2">Bien joué, c'est correct.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Shake */}
                    <motion.div
                        animate={feedback === "error" ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        {/* EXERCISE 1: KEYBOARD */}
                        {currentExercise.type === "keyboard" && (
                            <div className="flex flex-col items-center">
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        dir="rtl"
                                        placeholder="Tapez ici..."
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-4xl font-amiri text-center focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder:text-gray-200"
                                    />
                                    <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-6 h-6" />
                                </div>
                            </div>
                        )}

                        {/* EXERCISE 2: SENTENCE BUILDER */}
                        {currentExercise.type === "builder" && (
                            <div className="flex flex-col items-center">
                                {/* Result Area */}
                                <div className="w-full min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 mb-10 flex flex-row-reverse flex-wrap items-center justify-center gap-4">
                                    {builderSelection.length === 0 && <span className="text-gray-300 font-medium italic">Composez la phrase...</span>}
                                    {builderSelection.map((word, idx) => (
                                        <motion.button
                                            layoutId={`word-${word}`}
                                            key={`selected-${idx}`}
                                            onClick={() => setBuilderSelection(prev => prev.filter((_, i) => i !== idx))}
                                            className="bg-emerald-600 text-white font-amiri text-3xl px-6 py-2 rounded-xl shadow-md cursor-pointer hover:bg-emerald-700 active:scale-95 transition-all"
                                        >
                                            {word}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Options Area */}
                                <div className="flex flex-row-reverse gap-4">
                                    {currentExercise.options?.map((word, idx) => (
                                        !builderSelection.includes(word) && (
                                            <motion.button
                                                layoutId={`word-${word}`}
                                                key={`option-${idx}`}
                                                onClick={() => setBuilderSelection(prev => [...prev, word])}
                                                className="bg-white border-2 border-gray-200 text-emerald-900 font-amiri text-3xl px-8 py-3 rounded-2xl shadow-sm hover:border-emerald-400 hover:text-emerald-700 transition-all cursor-pointer"
                                            >
                                                {word}
                                            </motion.button>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* EXERCISE 3: VOICE */}
                        {currentExercise.type === "voice" && (
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-50 rounded-full w-24 h-24 mb-8 flex items-center justify-center relative">
                                    {isRecording && (
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className="absolute inset-0 bg-emerald-500/20 rounded-full"
                                        />
                                    )}
                                    <button
                                        onClick={startSpeech}
                                        disabled={isRecording}
                                        className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${isRecording ? 'bg-emerald-500 scroll-p-24' : 'bg-white hover:bg-gray-100'}`}
                                    >
                                        <Mic className={`w-8 h-8 ${isRecording ? 'text-white' : 'text-emerald-600'}`} />
                                    </button>
                                </div>

                                <div className="text-center min-h-[60px]">
                                    <AnimatePresence mode="wait">
                                        {isRecording ? (
                                            <motion.p key="rec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 font-bold">Écoute en cours...</motion.p>
                                        ) : voiceText ? (
                                            <motion.p key="res" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-amiri text-emerald-900" dir="rtl">{voiceText}</motion.p>
                                        ) : (
                                            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 font-medium">Appuyez sur le micro et prononcez "Hadha kitab"</motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Action Button */}
                <div className="mt-10">
                    <button
                        onClick={validateExercise}
                        className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-5 rounded-[2rem] shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1 active:translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
                    >
                        Vérifier
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Progress Footer */}
                <footer className="mt-12 flex justify-center gap-8">
                    <div className="flex items-center gap-2 text-gray-400 font-bold hover:text-emerald-600 transition cursor-pointer">
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-tighter">Réinitialiser</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 font-bold">
                        <Layout className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-tighter">Médine Tome 1</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
