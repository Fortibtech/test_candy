"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Plane,
  Train,
  Calendar,
  MapPin,
  Search,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  Leaf,
  Clock,
  Menu,
  X
} from "lucide-react";

export default function DemoTrainAirPage() {
  const [activeTab, setActiveTab] = useState<"train-air" | "train-only">("train-air");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-50 font-sans selection:bg-blue-600/30 overflow-x-hidden">

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-[#070b19]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Train className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">SNCF <span className="text-blue-500">Connect+</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Destinations</a>
              <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Offres</a>
              <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Aide</a>
              <button className="px-5 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center gap-2">
                <Users className="w-4 h-4" />
                Se connecter
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-300">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#070b19] border-b border-white/10 p-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <a href="#" className="px-4 py-3 bg-white/5 rounded-lg text-sm font-medium">Destinations</a>
              <a href="#" className="px-4 py-3 bg-white/5 rounded-lg text-sm font-medium">Offres</a>
              <button className="px-4 py-3 bg-blue-600 rounded-lg text-sm font-medium w-full flex justify-center">
                Se connecter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION & SEARCH ENGINE --- */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Plane className="w-4 h-4" />
              <span>Nouveau : Billets combinés avec 150+ compagnies aériennes</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Prenez le train.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Attrapez l&apos;avion.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Simplifiez vos voyages longue distance. Réservez votre trajet en train et votre vol international en une seule transaction fluide et 100% garantie.
            </motion.p>
          </motion.div>

          {/* SEARCH ENGINE (Le Moteur) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-2xl shadow-blue-900/20"
          >
            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-2xl w-fit mb-4">
              <button
                onClick={() => setActiveTab("train-air")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "train-air" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  }`}
              >
                <Train className="w-4 h-4" /> + <Plane className="w-4 h-4" />
                Train + Air
              </button>
              <button
                onClick={() => setActiveTab("train-only")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "train-only" ? "bg-white/10 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  }`}
              >
                <Train className="w-4 h-4" />
                Train uniquement
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Point de départ */}
              <div className="col-span-1 lg:col-span-1 bg-black/20 hover:bg-black/40 transition flex items-center gap-3 p-4 rounded-xl border border-white/5">
                <MapPin className="text-slate-400 w-5 h-5" />
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-400 font-medium">Départ</span>
                  <input type="text" placeholder="Gare ou Ville" className="bg-transparent border-none text-white focus:outline-none placeholder:text-slate-500 font-medium w-full" />
                </div>
              </div>

              {/* Point d'arrivée */}
              <div className="col-span-1 lg:col-span-1 bg-black/20 hover:bg-black/40 transition flex items-center gap-3 p-4 rounded-xl border border-white/5">
                <Plane className="text-slate-400 w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col text-left w-full">
                  <span className="text-xs text-slate-400 font-medium">Arrivée</span>
                  <input type="text" placeholder="Aéroport" className="bg-transparent border-none text-white focus:outline-none placeholder:text-slate-500 font-medium w-full" />
                </div>
              </div>

              {/* Dates */}
              <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-black/20 hover:bg-black/40 transition flex items-center gap-3 p-4 rounded-xl border border-white/5 justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="text-slate-400 w-5 h-5" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-slate-400 font-medium">Aller</span>
                    <span className="text-white font-medium text-sm">Ajouter</span>
                  </div>
                </div>
                <div className="w-[1px] h-6 bg-white/10"></div>
                <div className="flex flex-col text-left pl-2">
                  <span className="text-xs text-slate-400 font-medium">Retour</span>
                  <span className="text-white font-medium text-sm">Ajouter</span>
                </div>
              </div>

              {/* Passagers */}
              <div className="col-span-1 lg:col-span-1 bg-black/20 hover:bg-black/40 transition flex items-center gap-3 p-4 rounded-xl border border-white/5">
                <Users className="text-slate-400 w-5 h-5" />
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-400 font-medium">Passagers</span>
                  <span className="text-white font-medium text-sm">1 Adulte</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button className="col-span-1 md:col-span-2 lg:col-span-1 bg-blue-600 hover:bg-blue-500 transition-all text-white rounded-xl flex items-center justify-center gap-2 p-4 font-semibold group overflow-hidden relative shadow-lg shadow-blue-900/30">
                <span className="relative z-10 flex items-center gap-2">
                  Rechercher <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
                <div className="absolute top-0 left-[-100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES / REASSURANCE --- */}
      <section className="py-20 bg-[#0a0e1e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">L&apos;expérience de bout en bout</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Votre tranquillité d&apos;esprit est notre priorité. Ne vous souciez plus des correspondances ratées ou des bagages.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Correspondance 100% garantie",
                desc: "Si votre train est en retard, nous vous plaçons automatiquement sur le prochain vol sans frais supplémentaires."
              },
              {
                icon: Leaf,
                title: "Empreinte carbone réduite",
                desc: "Remplacer un vol intérieur par un trajet en TGV réduit vos émissions de CO2 jusqu'à 85%."
              },
              {
                icon: Clock,
                title: "Enregistrement synchronisé",
                desc: "Enregistrez-vous une seule fois dans la gare de départ pour votre train et votre vol international."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-emerald-500 text-emerald-500" />
            ))}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">&quot;Une révolution pour mes voyages d&apos;affaires&quot;</h2>
          <p className="text-xl text-slate-300 max-w-3xl mb-12 italic">
            &quot;Réserver mon Paris-Tokyo au départ de Rennes en une seule fois m&apos;a enlevé une charge mentale énorme. La correspondance à CDG s&apos;est faite sans le moindre stress.&quot;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold">JD</div>
            <div className="text-left">
              <p className="font-semibold">Jean Dupont</p>
              <p className="text-sm text-slate-400">Voyageur Fréquent</p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 w-full mb-8">
            <p className="text-sm text-slate-400 mb-8 uppercase tracking-widest font-semibold text-center">Partenaires Aériens</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Simulate logos with text for the demo */}
              <div className="text-xl font-bold font-serif">AIR FRANCE</div>
              <div className="text-xl font-bold font-serif">EMIRATES</div>
              <div className="text-xl font-bold font-sans tracking-tighter">DELTA AIRLINES</div>
              <div className="text-xl font-bold font-sans">QATAR</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#070b19] to-[#04060f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à simplifier vos correspondances ?</h2>
          <p className="text-slate-400 mb-10 text-lg">Rejoignez des milliers de voyageurs qui ont déjà fait le choix de la facilité et de l&apos;écologie.</p>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors inline-flex items-center gap-3">
            Essayer le simulateur <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#03050a] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6 opacity-80">
              <Train className="w-5 h-5 text-blue-500" />
              <span className="font-bold">SNCF Connect+</span>
            </div>
            <p className="text-slate-500 text-sm">Simplifier la mobilité de bout en bout pour tous les européens.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Destinations</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400">Paris - New York</a></li>
              <li><a href="#" className="hover:text-blue-400">Lyon - Tokyo</a></li>
              <li><a href="#" className="hover:text-blue-400">Bordeaux - Montréal</a></li>
              <li><a href="#" className="hover:text-blue-400">Lille - Dubaï</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Entreprise</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400">À propos</a></li>
              <li><a href="#" className="hover:text-blue-400">Carrières</a></li>
              <li><a href="#" className="hover:text-blue-400">Presse</a></li>
              <li><a href="#" className="hover:text-blue-400">Partenaires</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Légal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-400">CGV</a></li>
              <li><a href="#" className="hover:text-blue-400">Mentions légales</a></li>
              <li><a href="#" className="hover:text-blue-400">Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 border-t border-white/5 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} SNCF Connect+. Prototype pour démonstration. Non affilié officiellement avec la SNCF pour cette démo.
        </div>
      </footer>

      <style jsx global>{`
        @keyframes shine {
          100% { left: 150%; }
        }
        .animate-shine {
          animation: shine 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
