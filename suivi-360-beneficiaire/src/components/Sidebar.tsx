"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart3, Settings, ShieldAlert, LogOut } from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Tableau de bord', icon: Home },
        { href: '/beneficiaires', label: 'Bénéficiaires', icon: Users },
        { href: '/statistiques', label: 'Statistiques', icon: BarChart3 },
        { href: '/parametres', label: 'Paramètres', icon: Settings },
    ];

    return (
        <div className="w-64 bg-white border-r border-neutral-100 min-h-screen flex flex-col fixed left-0 top-[#73px] h-[calc(100vh-73px)]">
            <div className="flex-1 py-6 px-4 space-y-2">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive
                                    ? 'bg-primary-50 text-primary-700 font-semibold'
                                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-neutral-400'}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <div className="p-4 border-t border-neutral-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium text-sm">
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
