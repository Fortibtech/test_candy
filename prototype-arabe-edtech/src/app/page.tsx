"use client"

import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const fadersRef = useRef<(Element | null)[]>([]);
  const [activeTab, setActiveTab] = useState("parcours");

  useEffect(() => {
    // Réinitialiser les refs à chaque changement d'onglet
    fadersRef.current = [];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Timeout léger affiché pour laisser le temps au DOM de se peindre
    setTimeout(() => {
      fadersRef.current.forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 50);

    return () => observer.disconnect();
  }, [activeTab]);

  const addToRefs = (el: Element | null) => {
    if (el && !fadersRef.current.includes(el)) {
      fadersRef.current.push(el);
    }
  };

  return (
    <>
      {/* 1. BLOC RASSURANCE (Administrable via CMS) */}
      <div className="bg-emerald-900 text-emerald-50 text-xs sm:text-sm py-2 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-col sm:flex-row text-center transition-all">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-gold-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
              </svg>
            </div>
            <span className="font-bold tracking-wide uppercase">
              Propulsé par Fortibtech CMS
            </span>
          </div>
          <span className="hidden sm:inline border-r border-emerald-700 h-4"></span>
          <span className="opacity-90 leading-tight">
            Interface frontend dynamique. <b>Glissez-déposez</b> votre contenu en
            un clic.
          </span>
        </div>
      </div>

      {/* Navigation Header de l'app (Style EdTech Premium) */}
      <nav className="glass-panel flex justify-between items-center px-6 md:px-12 py-4 sticky top-10 z-40 shadow-sm mx-4 md:mx-8 rounded-2xl mt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-emerald-glow transform transition hover:rotate-3 cursor-pointer">
            <span className="text-white font-arabic font-bold text-xl drop-shadow-md">
              ض
            </span>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-emerald-900 cursor-pointer">
            Arabi<span className="text-gold-500">Learn</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-500 text-sm">
          <button
            onClick={() => setActiveTab("parcours")}
            className={activeTab === "parcours" ? "text-emerald-700 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500 after:-mb-1" : "hover:text-emerald-700 transition cursor-pointer"}
          >
            Mon Parcours
          </button>
          <button
            onClick={() => setActiveTab("revisions")}
            className={activeTab === "revisions" ? "text-emerald-700 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500 after:-mb-1" : "hover:text-emerald-700 transition cursor-pointer"}
          >
            Révisions
          </button>
          <button
            onClick={() => setActiveTab("statistiques")}
            className={activeTab === "statistiques" ? "text-emerald-700 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500 after:-mb-1" : "hover:text-emerald-700 transition cursor-pointer"}
          >
            Statistiques
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800">Fortibtech</p>
            <p className="text-xs text-gold-600 font-semibold uppercase">
              Administrateur
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-sand-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer hover:ring-2 ring-emerald-400 transition">
            <span className="text-emerald-800 font-bold text-lg">F</span>
          </div>
        </div>
      </nav>

      {activeTab === "parcours" ? (
        <>
          {/* En-tête de section */}
          <header
            ref={addToRefs}
            className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center fade-in-up"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6 border border-emerald-100 shadow-sm">
              Niveau A1 &bull; Débutant
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-4 leading-tight tracking-tight">
              Reprenez votre apprentissage
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium">
              Continuez votre progression à votre rythme. Vous êtes sur le point de
              maîtriser les salutations de base.
            </p>
          </header>

          <main className="pb-24 overflow-hidden relative">
            {/* Background Ornements abstraits (EdTech Style) */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl -ml-32 mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-200 rounded-full opacity-20 blur-3xl -mr-48 mb-32 pointer-events-none"></div>

            {/* 2. DASHBOARD DE PROGRESSION (Path) */}
            <section
              ref={addToRefs}
              className="max-w-6xl mx-auto px-4 sm:px-6 relative fade-in-up"
            >
              <div className="relative py-10 pl-12 md:pl-0">
                {/* La Ligne du chemin connectant les leçons */}
                <div className="path-line"></div>

                {/* Step 1: Leçon Terminée */}
                <div className="relative flex md:justify-end items-center mb-16 md:w-1/2 md:-ml-8 z-10 group cursor-pointer">
                  <div className="absolute -left-12 md:-right-8 md:left-auto w-10 h-10 bg-emerald-500 rounded-full border-4 border-sand-50 shadow-md flex items-center justify-center transform md:translate-x-1/2 z-20 group-hover:scale-110 transition duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-soft border border-gray-100 w-full md:max-w-md group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-300 relative">
                    <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                        Revoir{" "}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      Leçon 1 <span className="w-1 h-1 bg-gray-300 rounded-full block"></span>{" "}
                      Écriture
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      L&apos;Alphabet Fondamental
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Introduction aux 28 lettres et à la prononciation basique des
                      voyelles courtes.
                    </p>
                  </div>
                </div>

                {/* Step 2: Leçon En cours (Active) */}
                <div className="relative flex md:justify-start items-center mb-16 md:w-1/2 md:ml-auto md:-mr-8 z-10">
                  <div className="absolute -left-14 md:-left-12 w-14 h-14 bg-gold-400 rounded-full border-[5px] border-sand-50 shadow-glow animate-pulse-gold flex items-center justify-center transform md:-translate-x-1/2 z-20">
                    <svg
                      className="w-6 h-6 text-emerald-900 ml-1 translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-100 w-full md:max-w-[32rem] relative transform hover:-translate-y-1 transition duration-300 ease-in-out">
                    {/* Badge "En cours" flottant */}
                    <div className="absolute top-0 right-0 -mt-3 mr-6 bg-gradient-to-r from-gold-400 to-gold-500 text-emerald-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-900 opacity-30"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-900"></span>
                      </span>
                      En cours
                    </div>

                    <div className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                      Leçon 2{" "}
                      <span className="w-1 h-1 bg-gold-300 rounded-full block"></span>{" "}
                      Vocabulaire
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Les Salutations
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      Apprenez à dire bonjour, demander comment ça va et vous présenter
                      formallement.
                    </p>

                    {/* 3. INTERFACE DE LEÇON INBRIQUÉE (Preview visuel premium) */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-4 shadow-inner relative overflow-hidden group">
                      {/* Vecteur d'habillage */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>

                      <div className="flex items-start justify-between gap-5 relative z-10">
                        {/* Image de contexte (Illustration) */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md flex-shrink-0 relative group-hover:scale-105 transition duration-500">
                          <div className="absolute inset-0 bg-emerald-900/10 hover:bg-transparent transition duration-300"></div>
                          <img
                            src="https://images.unsplash.com/photo-1542042161784-26ab9e041e89?q=80&w=250&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Image Salutations"
                          />
                        </div>

                        {/* Contenu Arabe */}
                        <div
                          className="text-right flex-1 flex flex-col justify-center h-full"
                          dir="rtl"
                        >
                          <h4 className="font-arabic font-extrabold text-4xl text-emerald-900 mb-2 drop-shadow-sm leading-tight">
                            مَرْحَباً بك
                          </h4>
                          <p className="font-arabic-serif text-emerald-600 font-bold text-sm mb-1">
                            Marhaban bika
                          </p>
                          <p
                            className="text-xs text-gray-500 font-sans font-medium"
                            dir="ltr"
                          >
                            Bienvenue à toi (m.)
                          </p>
                        </div>
                      </div>

                      {/* Composant Lecteur Audio Stylisé */}
                      <div className="flex items-center gap-3 bg-white px-3 py-2.5 rounded-full border border-gray-200 shadow-sm mt-1">
                        <button className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white flex items-center justify-center transition shadow-emerald-glow transform hover:scale-105 active:scale-95">
                          <svg
                            className="w-4 h-4 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden cursor-pointer">
                          <div className="w-1/3 h-full bg-emerald-500 rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full scale-[1.5] shadow-sm"></div>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-500 font-bold pr-2 font-mono tracking-tighter">
                          0:01 / 0:03
                        </span>
                      </div>
                    </div>

                    {/* Bouton d'action principal */}
                    <button className="w-full mt-6 bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 group/btn">
                      Reprendre la leçon
                      <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Step 3: Leçon Verrouillée */}
                <div className="relative flex md:justify-end items-center md:w-1/2 md:-ml-8 z-10 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
                  <div className="absolute -left-12 md:-right-8 md:left-auto w-10 h-10 bg-gray-200 rounded-full border-4 border-sand-50 flex items-center justify-center transform md:translate-x-1/2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border border-gray-200 w-full md:max-w-md">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Leçon 3
                    </div>
                    <h3 className="text-xl font-bold text-gray-600 mb-1">
                      La Famille (Al-Usra)
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Vocabulaire autour du foyer et des proches. Débloqué après la leçon
                      2.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. MODULE QUIZ (Interaction QCM Premium) */}
            <section
              ref={addToRefs}
              className="max-w-3xl mx-auto px-4 sm:px-6 mt-32 fade-in-up"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center justify-center gap-3 mb-10">
                <span className="w-12 h-[1px] bg-gray-300"></span>
                <h2 className="text-3xl font-extrabold text-center text-emerald-900 tracking-tight">
                  Testez vos connaissances
                </h2>
                <span className="w-12 h-[1px] bg-gray-300"></span>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 overflow-hidden relative">
                {/* Barre de progression de l'exercice */}
                <div className="h-2.5 w-full bg-sand-100">
                  <div className="h-full bg-gradient-to-r from-gold-400 to-gold-500 w-3/4 rounded-r-full shadow-sm relative">
                    <div className="absolute inset-0 bg-white/20 rounded-r-full w-full h-full overflow-hidden">
                      <div className="h-full w-10 bg-white/40 skew-x-12 translate-x-[20rem]"></div>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-12 relative overflow-hidden">
                  {/* Décoration fond Quiz */}
                  <div className="absolute -top-16 -right-16 text-[15rem] font-arabic opacity-[0.03] text-emerald-900 select-none pointer-events-none">
                    ؟
                  </div>

                  {/* Badge Compteur */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold mb-8 border border-emerald-100 shadow-sm">
                    <svg
                      className="w-4 h-4 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                    Question 3 sur 4
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-gold-400 pl-4">
                    Que signifie cette expression ?
                  </h3>

                  {/* L'élément à deviner */}
                  <div className="bg-gradient-to-br from-sand-50 to-sand-100 rounded-3xl p-10 mb-12 text-center border border-sand-200 shadow-inner group">
                    <span
                      className="font-arabic font-extrabold text-7xl text-emerald-900 drop-shadow-sm leading-tight block mb-4 group-hover:scale-105 transition-transform duration-500"
                      dir="rtl"
                    >
                      شُكْراً
                    </span>
                    <div className="flex justify-center mt-6">
                      <button className="w-12 h-12 rounded-full bg-white border border-gray-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-md group-hover:shadow-lg animate-subtle-bounce cursor-pointer">
                        <svg
                          className="w-5 h-5 ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Options Flexibles & Fluides */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option 1 */}
                    <label className="group relative cursor-pointer outline-none">
                      <input type="radio" name="quiz" className="peer sr-only" />
                      <div className="p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-emerald-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-50/50 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md transform hover:-translate-y-1">
                        <span className="font-medium text-lg text-gray-600 group-hover:text-emerald-800 peer-checked:text-emerald-900 peer-checked:font-bold transition-colors">
                          Bonjour
                        </span>
                        <div className="w-7 h-7 rounded-full border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center transition-all duration-300">
                          <svg
                            className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-300 delay-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </label>

                    {/* Option 2 (Checked) */}
                    <label className="group relative cursor-pointer outline-none">
                      <input
                        type="radio"
                        name="quiz"
                        className="peer sr-only"
                        defaultChecked
                      />
                      <div className="p-5 rounded-2xl border-2 border-green-500 bg-emerald-50/70 hover:border-emerald-400 transition-all duration-300 flex items-center justify-between shadow-md transform -translate-y-1 ring-4 ring-emerald-500/10">
                        <span className="font-bold text-lg text-emerald-900">Merci</span>
                        <div className="w-7 h-7 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center shadow-emerald-glow">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </label>

                    {/* Option 3 */}
                    <label className="group relative cursor-pointer outline-none">
                      <input type="radio" name="quiz" className="peer sr-only" />
                      <div className="p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-emerald-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-50/50 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md transform hover:-translate-y-1">
                        <span className="font-medium text-lg text-gray-600 group-hover:text-emerald-800 peer-checked:text-emerald-900 peer-checked:font-bold transition-colors">
                          S'il vous plaît
                        </span>
                        <div className="w-7 h-7 rounded-full border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center transition-all duration-300">
                          <svg
                            className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-300 delay-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </label>

                    {/* Option 4 */}
                    <label className="group relative cursor-pointer outline-none">
                      <input type="radio" name="quiz" className="peer sr-only" />
                      <div className="p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-emerald-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-50/50 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md transform hover:-translate-y-1">
                        <span className="font-medium text-lg text-gray-600 group-hover:text-emerald-800 peer-checked:text-emerald-900 peer-checked:font-bold transition-colors">
                          Au revoir
                        </span>
                        <div className="w-7 h-7 rounded-full border-2 border-gray-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 flex items-center justify-center transition-all duration-300">
                          <svg
                            className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-300 delay-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="mt-12 flex justify-between items-center border-t border-gray-100 pt-8">
                    <button className="text-gray-400 font-semibold hover:text-gray-600 transition underline underline-offset-4 decoration-2 decoration-gray-200 hover:decoration-gray-400">
                      Passer la question
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-10 rounded-2xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-3 transform hover:-translate-y-1 cursor-pointer">
                      Valider
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : activeTab === "revisions" ? (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 pt-20 animate-fade-in-up">
          <header className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-4 border border-emerald-100 shadow-sm">
              Vos Flashcards &bull; Spaced Repetition
            </span>
            <h2 className="text-4xl font-extrabold text-emerald-900 mb-4 tracking-tight">À réviser aujourd'hui</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">12 cartes vous attendent dans ce module généré dynamiquement. Maintenez votre série pour renforcer votre mémoire à long terme.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Flashcard 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 relative group cursor-pointer hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-4 right-4 text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Nouveau</div>
              <p className="font-arabic font-extrabold text-5xl text-emerald-900 text-center my-8 drop-shadow-sm select-none" dir="rtl">قَلَم</p>
              <div className="opacity-0 group-hover:opacity-100 transition duration-300 text-center border-t border-gray-100 pt-4 mt-4">
                <p className="text-lg font-bold text-gray-800">un stylo</p>
                <p className="text-sm text-emerald-600 font-medium font-arabic-serif">qalam</p>
              </div>
            </div>
            {/* Flashcard 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-emerald-500 ring-4 ring-emerald-500/10 relative group cursor-pointer transition-all duration-300 transform scale-105 z-10 w-full lg:-mt-4">
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gold-400 text-white flex items-center justify-center shadow-md animate-subtle-bounce">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <div className="absolute top-4 right-4 text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">À revoir</div>
              <p className="font-arabic font-extrabold text-6xl text-emerald-900 text-center my-8 drop-shadow-sm select-none" dir="rtl">كِتَاب</p>
              <div className="text-center border-t border-gray-100 pt-4 mt-6">
                <p className="text-xl font-bold text-gray-800 mb-1">un livre</p>
                <p className="text-sm text-emerald-600 font-medium font-arabic-serif mb-4">kitāb</p>
                <div className="flex gap-2 justify-center">
                  <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl transition text-sm cursor-pointer">Difficile</button>
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-glow font-bold py-2 rounded-xl transition text-sm cursor-pointer">Facile (4j)</button>
                </div>
              </div>
            </div>
            {/* Flashcard 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 relative group cursor-pointer hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-4 right-4 text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">En mémoire</div>
              <p className="font-arabic font-extrabold text-5xl text-gray-800 text-center my-8 drop-shadow-sm select-none" dir="rtl">مَدْرَسَة</p>
              <div className="opacity-0 group-hover:opacity-100 transition duration-300 text-center border-t border-gray-100 pt-4 mt-4">
                <p className="text-lg font-bold text-gray-800">une école</p>
                <p className="text-sm text-emerald-600 font-medium font-arabic-serif">madrasa</p>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 pt-20 animate-fade-in-up">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-emerald-900 mb-4 tracking-tight">Performances & Engagement</h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">Visualisez l'impact de l'apprentissage en temps réel via les données d'analyse agrégées de Fortibtech CMS.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Temps total</p>
                <p className="text-3xl font-extrabold text-gray-800">24<span className="text-lg text-gray-500 font-medium ml-1">h</span> 12<span className="text-lg text-gray-500 font-medium ml-1">m</span></p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2rem] p-6 shadow-emerald-glow border border-emerald-500 flex items-center gap-6 text-white transform hover:scale-105 transition duration-300 cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-gold-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-1">Série Actuelle</p>
                <p className="text-3xl font-extrabold text-white">14 <span className="text-lg text-emerald-200 font-medium">jours 🔥</span></p>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Vocabulaire Maîtrisés</p>
                <p className="text-3xl font-extrabold text-gray-800">186 <span className="text-lg text-gray-500 font-medium">mots</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-emerald-900 mb-8">Niveaux atteints</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="font-bold text-gray-700">A1 &bull; Débutant</span>
                  <span className="font-bold text-emerald-600">85%</span>
                </div>
                <div className="h-4 w-full bg-sand-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-500 w-[85%] rounded-full relative">
                    <div className="absolute inset-0 bg-white/20 w-full h-full overflow-hidden rounded-full">
                      <div className="h-full w-20 bg-white/40 skew-x-12 animate-pulse-gold inline-block"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="font-bold text-gray-700">A2 &bull; Élémentaire</span>
                  <span className="font-bold text-gold-500">12%</span>
                </div>
                <div className="h-4 w-full bg-sand-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-gold-400 to-gold-500 w-[12%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="font-bold text-gray-400">B1 &bull; Intermédiaire</span>
                  <span className="font-bold text-gray-400">0%</span>
                </div>
                <div className="h-4 w-full bg-sand-100 rounded-full overflow-hidden shadow-inner"></div>
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="bg-white border-t border-gray-200 py-12 mt-16 text-center text-gray-500 text-sm fade-in-up">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
        </div>
        <p className="font-medium">
          Prototype d'interface EdTech généré. Propulsé par{" "}
          <b className="text-emerald-700">Fortibtech CMS</b>.
        </p>
        <p className="mt-2 text-xs opacity-70">
          Design responsive, composants modulaires Tailwind CSS, typographies optimisées.
        </p>
      </footer>
    </>
  );
}
