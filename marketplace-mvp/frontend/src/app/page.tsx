"use client";

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '@/lib/api';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ArrowRight, CheckCircle, ShieldCheck, Sparkles, Truck, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    category?: string;
    seller: {
        name: string;
    };
}

const CATEGORIES = [
    { name: "Sacs de luxe", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400" },
    { name: "Montres", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400" },
    { name: "Sneakers", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400" },
    { name: "Joaillerie", image: "https://images.unsplash.com/photo-1515562141207-7a88fb052254?auto=format&fit=crop&q=80&w=400" },
];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-neutral-bg min-h-screen pb-20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[90vh] w-full bg-stone-900 overflow-hidden flex items-center justify-center">
                {/* Background Image/Overlay */}
                <div className="absolute inset-0 z-0 opacity-60 animate-in fade-in duration-1000">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover scale-105 animate-in zoom-in-50 duration-[20s] ease-linear"
                        style={{ animationFillMode: 'forwards' }}
                    />
                </div>
                <div className="absolute inset-0 bg-black/30 z-0" />

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
                    <Reveal delay={200}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-xl">
                            L'élégance,<br /> <span className="text-accent italic">seconde main.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={400}>
                        <p className="text-lg md:text-2xl text-stone-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                            Rejoignez la première communauté dédiée à l'achat et la vente de pièces d'exception. Authentifié, sécurisé, premium.
                        </p>
                    </Reveal>

                    <Reveal delay={600}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                            <Link href="/products">
                                <Button variant="primary" size="lg" className="min-w-[200px] h-14 text-lg bg-white text-primary hover:bg-stone-50 hover:text-black shadow-xl hover:shadow-2xl border-white transition-all transform hover:-translate-y-1">
                                    Découvrir la collection
                                </Button>
                            </Link>
                            <Link href="/publish">
                                <Button variant="outline" size="lg" className="min-w-[200px] h-14 text-lg text-white border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all">
                                    Vendre une pièce
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Categories Section */}
            <section className="container mx-auto px-4 py-32">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div className="max-w-xl">
                            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">Explorer</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Catégories Populaires</h2>
                        </div>
                        <Link href="/products" className="text-base font-medium text-stone-500 hover:text-primary transition-colors flex items-center gap-2 group pb-2 border-b border-transparent hover:border-primary">
                            Voir toute la boutique <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </Reveal>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, idx) => (
                        <Reveal key={idx} delay={idx * 150} className="h-full">
                            <Link href={`/products?category=${encodeURIComponent(cat.name)}`}>
                                <div className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft-md hover:shadow-soft-xl transition-all duration-500">
                                    <div className="absolute inset-0 bg-stone-200">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-bold font-serif text-white mb-2">{cat.name}</h3>
                                        <div className="w-8 h-0.5 bg-accent group-hover:w-16 transition-all duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section id="products" className="bg-white py-32 border-t border-stone-50">
                <div className="container mx-auto px-4">
                    <Reveal>
                        <div className="text-center mb-20 max-w-3xl mx-auto">
                            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Sélection Exclusive</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Les dernières pépites</h2>
                            <p className="text-stone-500 font-light text-xl leading-relaxed">
                                Une sélection curée de nos meilleures pièces, vérifiées par nos experts et prêtes pour une seconde vie.
                            </p>
                        </div>
                    </Reveal>

                    {loading ? (
                        <div className="min-h-[400px] flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <Reveal>
                            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-100 max-w-2xl mx-auto">
                                <ShoppingBag className="mx-auto h-16 w-16 text-stone-300 mb-6" />
                                <p className="text-stone-500 text-xl mb-8 font-light">Aucune pièce disponible pour le moment.</p>
                                <Link href="/publish">
                                    <Button size="lg" className="shadow-lg">Vendre la première pièce</Button>
                                </Link>
                            </div>
                        </Reveal>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {products.map((product, idx) => (
                                <Reveal key={product.id} delay={idx * 100}>
                                    <ProductCard
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        imageUrl={product.imageUrl || ''}
                                        sellerName={product.seller?.name || 'Membre vérifié'}
                                        category={product.category}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    )}

                    <Reveal delay={200}>
                        <div className="text-center mt-20">
                            <Link href="/products">
                                <Button variant="secondary" size="lg" className="px-12 h-14 text-lg border-stone-200 hover:border-primary hover:bg-stone-50 transition-all">
                                    Voir toute la collection
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Trust Section */}
            <section className="container mx-auto px-4 py-32 border-t border-stone-100 bg-gradient-to-b from-transparent to-stone-50/50">
                <div className="grid md:grid-cols-3 gap-12 lg:gap-20 text-center">
                    <Reveal delay={0}>
                        <div className="flex flex-col items-center gap-6 group">
                            <div className="w-20 h-20 bg-white shadow-soft-md rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-500 border border-stone-100">
                                <ShieldCheck size={36} strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-bold font-serif text-primary">Authentification Garantie</h3>
                            <p className="text-stone-500 leading-relaxed max-w-xs text-lg font-light">Chaque article est soigneusement vérifié par nos experts avant d'être mis en ligne.</p>
                        </div>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex flex-col items-center gap-6 group">
                            <div className="w-20 h-20 bg-white shadow-soft-md rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-500 border border-stone-100">
                                <Truck size={36} strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-bold font-serif text-primary">Livraison Premium</h3>
                            <p className="text-stone-500 leading-relaxed max-w-xs text-lg font-light">Livraison suivie et assurée pour toutes vos commandes, partout en Europe.</p>
                        </div>
                    </Reveal>
                    <Reveal delay={400}>
                        <div className="flex flex-col items-center gap-6 group">
                            <div className="w-20 h-20 bg-white shadow-soft-md rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-500 border border-stone-100">
                                <Sparkles size={36} strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-bold font-serif text-primary">Service Concierge</h3>
                            <p className="text-stone-500 leading-relaxed max-w-xs text-lg font-light">Une question ? Notre équipe est disponible 7j/7 pour vous accompagner.</p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
