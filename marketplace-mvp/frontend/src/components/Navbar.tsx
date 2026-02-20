"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, PlusCircle, Search, ShoppingBag, Heart, MessageCircle, User, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false); // Close mobile menu if open
        }
    };

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100' : 'bg-transparent border-transparent'}`}>
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex justify-between items-center h-20 gap-4">
                        {/* 1. Logo Section */}
                        <Link href="/" className="flex-shrink-0 z-50 relative">
                            <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${isMenuOpen ? "text-primary" : "text-primary"}`}>
                                Marketplace.
                            </span>
                        </Link>

                        {/* 2. Search Section - Desktop */}
                        <div className={`hidden md:flex flex-1 max-w-md mx-8 relative transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="w-full relative group">
                                <input
                                    type="text"
                                    placeholder="Rechercher une pièce rare..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full bg-stone-50 border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-primary/20 rounded-full px-5 py-2.5 pl-11 outline-none transition-all placeholder:text-stone-400 text-sm font-medium"
                                />
                                <button onClick={handleSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 group-focus-within:text-primary transition-colors">
                                    <Search className="w-full h-full" />
                                </button>
                            </div>
                        </div>

                        {/* 3. Actions Section - Desktop */}
                        <div className="hidden md:flex items-center space-x-6 z-20">
                            <Link href="/products" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                                Nouveautés
                            </Link>

                            {user ? (
                                <>
                                    <Link href="/messages" className="text-primary hover:text-accent transition-colors relative group">
                                        <MessageCircle size={22} strokeWidth={1.5} />
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    </Link>

                                    <Link href="/favorites" className="text-primary hover:text-accent transition-colors">
                                        <Heart size={22} strokeWidth={1.5} />
                                    </Link>

                                    {/* User Dropdown */}
                                    <div className="group relative">
                                        <button className="flex items-center gap-2 pl-2 outline-none">
                                            <div className="w-9 h-9 bg-stone-100 text-primary rounded-full flex items-center justify-center font-bold border border-stone-200 shadow-soft-sm group-hover:shadow-md transition-all">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                        </button>

                                        <div className="absolute right-0 top-full mt-4 w-64 bg-white rounded-2xl shadow-soft-xl border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 p-2 z-50">
                                            <div className="px-4 py-3 border-b border-stone-50">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Connecté en tant que</p>
                                                <p className="text-sm font-bold text-primary truncate">{user.email}</p>
                                            </div>
                                            <div className="p-1 space-y-1">
                                                <Link href="/profile" className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-stone-600 hover:text-primary hover:bg-stone-50 rounded-xl transition-colors">
                                                    <span>Profil</span>
                                                    <User size={16} />
                                                </Link>
                                                <Link href="/orders" className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-stone-600 hover:text-primary hover:bg-stone-50 rounded-xl transition-colors">
                                                    <span>Commandes</span>
                                                    <ShoppingBag size={16} />
                                                </Link>
                                            </div>
                                            <div className="p-1 border-t border-stone-50 mt-1">
                                                <button
                                                    onClick={logout}
                                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-red-50 rounded-xl transition-colors font-medium"
                                                >
                                                    <LogOut size={16} />
                                                    Se déconnecter
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/publish">
                                        <Button variant="primary" size="sm" className="ml-2" leftIcon={<PlusCircle size={16} />}>
                                            Vendre
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/auth/login" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                                        Connexion
                                    </Link>
                                    <Link href="/auth/register">
                                        <Button variant="primary" size="sm">
                                            S'inscrire
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4 z-50">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-primary hover:bg-stone-100 rounded-full transition-colors relative"
                                aria-label="Toggle menu"
                            >
                                <div className="relative w-6 h-6">
                                    <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
                                    <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                    <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">

                    {/* Search Mobile */}
                    <div className={`mb-8 opacity-0 transition-opacity duration-500 delay-100 ${isMenuOpen ? 'opacity-100' : ''}`}>
                        <div className="w-full relative group">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full bg-stone-50 border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-primary/20 rounded-full px-5 py-3.5 pl-11 outline-none text-base"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" onClick={handleSearch} />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-2 mb-8">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-between text-2xl font-serif font-bold text-primary py-3 border-b border-stone-50 opacity-0 transition-all duration-500 delay-150 ${isMenuOpen ? 'opacity-100 translate-x-0' : '-translate-x-4'}`}>
                            Marketplace.
                            <ChevronRight size={20} className="text-stone-300" />
                        </Link>
                        <Link href="/products" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-between text-2xl font-serif font-bold text-primary py-3 border-b border-stone-50 opacity-0 transition-all duration-500 delay-200 ${isMenuOpen ? 'opacity-100 translate-x-0' : '-translate-x-4'}`}>
                            Nouveautés
                            <ChevronRight size={20} className="text-stone-300" />
                        </Link>
                    </div>

                    {/* User Section */}
                    {user ? (
                        <div className={`mt-auto space-y-6 opacity-0 transition-all duration-500 delay-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
                            <div className="grid grid-cols-3 gap-4">
                                <Link href="/messages" onClick={() => setIsMenuOpen(false)} className="bg-stone-50 rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                                    <MessageCircle size={24} className="text-primary" />
                                    <span className="text-xs font-medium text-stone-600">Messages</span>
                                </Link>
                                <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="bg-stone-50 rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                                    <ShoppingBag size={24} className="text-primary" />
                                    <span className="text-xs font-medium text-stone-600">Achats</span>
                                </Link>
                                <Link href="/favorites" onClick={() => setIsMenuOpen(false)} className="bg-stone-50 rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                                    <Heart size={24} className="text-primary" />
                                    <span className="text-xs font-medium text-stone-600">Favoris</span>
                                </Link>
                            </div>

                            <Link href="/publish" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="primary" size="lg" className="w-full text-lg shadow-soft-lg" leftIcon={<PlusCircle size={20} />}>
                                    Vendre un article
                                </Button>
                            </Link>

                            <button
                                onClick={() => { logout(); setIsMenuOpen(false); }}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm text-stone-400 hover:text-error transition-colors font-medium"
                            >
                                <LogOut size={16} />
                                Se déconnecter
                            </button>
                        </div>
                    ) : (
                        <div className={`mt-auto space-y-4 opacity-0 transition-all duration-500 delay-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'translate-y-4'}`}>
                            <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="block">
                                <Button variant="outline" size="lg" className="w-full justify-center">
                                    Connexion
                                </Button>
                            </Link>
                            <Link href="/auth/register" onClick={() => setIsMenuOpen(false)} className="block">
                                <Button variant="primary" size="lg" className="w-full justify-center shadow-soft-lg">
                                    S'inscrire
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
