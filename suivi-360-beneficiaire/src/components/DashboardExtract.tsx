"use client";
import React from 'react';
import { Download, Users, AlertTriangle, TrendingUp, Filter, Lock, FileText, BarChart2 } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardExtract = () => {

    const chartData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Violences Physiques',
                data: [65, 59, 80, 81, 56, 45, 60, 50, 40, 45],
                borderColor: '#c084fc', // Lilas
                backgroundColor: 'rgba(192, 132, 252, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Violences Psychologiques',
                data: [28, 48, 40, 49, 86, 75, 80, 90, 85, 95],
                borderColor: '#f472b6', // Vieux rose
                backgroundColor: 'rgba(244, 114, 182, 0.1)',
                tension: 0.4,
                fill: true,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: {
                        family: 'Inter, sans-serif',
                        size: 12
                    }
                }
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#171717',
                bodyColor: '#525252',
                borderColor: '#e5e5e5',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: 'Inter, sans-serif'
                    }
                }
            },
            y: {
                border: {
                    display: false
                },
                grid: {
                    color: '#f5f5f5',
                }
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-lg font-bold text-neutral-800">Tableau de Bord & Reporting</h2>
                    <p className="text-sm text-neutral-500">Données agrégées et anonymisées pour les partenaires</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center space-x-2 text-sm text-neutral-600 bg-neutral-50 hover:bg-neutral-100 px-4 py-2 rounded-xl transition-colors font-medium border border-neutral-200">
                        <Filter className="w-4 h-4" />
                        <span>Filtres</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-secondary-700 bg-secondary-50 hover:bg-secondary-100 px-4 py-2 rounded-xl transition-colors font-medium border border-secondary-200">
                        <Download className="w-4 h-4" />
                        <span>PDF</span>
                    </button>
                    {/* Bouton d'Extraction Rapide */}
                    <button className="flex items-center space-x-2 text-sm text-white bg-primary-600 hover:bg-primary-700 px-5 py-2 rounded-xl transition-all shadow-sm shadow-primary-200 font-semibold hover:-translate-y-0.5 active:translate-y-0">
                        <FileText className="w-4 h-4" />
                        <span>Générer Bilan Annuel</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* KPI 1 */}
                <div className="bg-primary-50/50 p-5 rounded-xl border border-primary-100/50 lg:col-span-1">
                    <div className="flex justify-between items-start">
                        <div className="bg-primary-100 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center shadow-sm">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12%
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-800 mt-4">342</h3>
                    <p className="text-sm text-neutral-600 mt-1">Bénéficiaires (Ce mois)</p>
                </div>

                {/* KPI 2 */}
                <div className="bg-secondary-50/50 p-5 rounded-xl border border-secondary-100/50 lg:col-span-1">
                    <div className="flex justify-between items-start">
                        <div className="bg-secondary-100 p-2 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-secondary-600" />
                        </div>
                        <span className="text-xs font-medium text-neutral-500 bg-white px-2 py-0.5 rounded-full shadow-sm">
                            Verticales
                        </span>
                    </div>
                    <div className="mt-4 space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-neutral-600 font-medium">Physique</span>
                                <span className="font-bold text-secondary-700">45%</span>
                            </div>
                            <div className="w-full bg-secondary-200 rounded-full h-1.5">
                                <div className="bg-secondary-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-neutral-600 font-medium">Psy</span>
                                <span className="font-bold text-primary-600">55%</span>
                            </div>
                            <div className="w-full bg-primary-100 rounded-full h-1.5">
                                <div className="bg-primary-400 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evolution Chart */}
                <div className="bg-white p-5 rounded-xl border border-neutral-100 lg:col-span-2 hidden md:flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart2 className="w-4 h-4 text-neutral-400" />
                        <h3 className="text-sm font-semibold text-neutral-700">Évolution par Verticale (2024)</h3>
                    </div>
                    <div className="flex-1 min-h-[140px] relative">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-neutral-200">
                        <Lock className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-neutral-800">1,400+ Saisies Sécurisées (AES-256)</h3>
                        <p className="text-sm text-neutral-500 mt-0.5">Dossiers et rapports annuels conformes RGPD / nLPD et HDS.</p>
                    </div>
                </div>
                <div className="hidden sm:block text-right text-xs text-neutral-400 font-mono bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
                    STATUS: ENCRYPTED
                </div>
            </div>
        </div>
    );
};

export default DashboardExtract;
