"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Menu, X, LogOut, PlusCircle } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
                        Marketplace C2C
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                            Parcourir
                        </Link>

                        {user ? (
                            <>
                                <Link href="/publish" className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow-md font-medium text-sm">
                                    <PlusCircle size={16} />
                                    <span>Vendre</span>
                                </Link>

                                <Link href="/messages" className="text-sm font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                                    Messages
                                </Link>

                                <Link href="/orders" className="text-sm font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                                    Commandes
                                </Link>

                                <div className="group relative">
                                    <button className="flex items-center gap-2 pl-2 text-primary hover:text-accent transition-colors">
                                        <div className="w-9 h-9 bg-neutral-bg text-primary rounded-full flex items-center justify-center font-bold border border-gray-200">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                    </button>

                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                        <div className="p-4">
                                            <div className="px-3 py-2 bg-neutral-bg mb-3">
                                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Connecté en tant que</p>
                                                <p className="text-sm font-medium text-primary truncate">{user.email}</p>
                                            </div>
                                            <Link href="/profile" className="block w-full text-left px-3 py-2 text-sm text-primary hover:text-accent transition-colors mb-1">
                                                Modifier mon profil
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Se déconnecter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link href="/publish" className="text-sm font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                                    Vendre
                                </Link>
                                <div className="h-4 w-px bg-gray-300"></div>
                                <Link href="/auth/login" className="text-sm font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                                    Se connecter
                                </Link>
                                <Link href="/auth/register" className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all font-medium text-sm hover:shadow-md">
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-primary hover:bg-neutral-bg transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-2 duration-200">
                    <div className="px-6 pt-4 pb-8 space-y-4">
                        <Link href="/" className="block py-2 text-base font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                            Parcourir
                        </Link>
                        {user ? (
                            <>
                                <Link href="/publish" className="flex items-center gap-2 py-2 text-base font-medium text-accent hover:text-primary transition-colors uppercase tracking-wide">
                                    <PlusCircle size={18} />
                                    Vendre un article
                                </Link>
                                <Link href="/messages" className="block py-2 text-base font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                                    Messages
                                </Link>
                                <Link href="/orders" className="block py-2 text-base font-medium text-primary hover:text-accent transition-colors uppercase tracking-wide">
                                    Commandes
                                </Link>
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Compte</p>
                                    <p className="text-sm font-medium text-primary mb-4">{user.email}</p>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 text-red-500 font-medium hover:text-red-700 uppercase tracking-wide text-sm"
                                    >
                                        <LogOut size={16} />
                                        Se déconnecter
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <Link href="/auth/login" className="flex justify-center items-center px-4 py-3 text-sm font-medium text-primary border border-gray-900 hover:bg-gray-50 transition-colors uppercase tracking-wide">
                                    Connexion
                                </Link>
                                <Link href="/auth/register" className="flex justify-center items-center px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-gray-800 transition-colors uppercase tracking-wide">
                                    Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
