"use client";

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '@/lib/api';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    seller: {
        name: string;
    };
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('title', searchTerm);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);

            const response = await api.get(`/products?${params.toString()}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search term
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchProducts();
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(delaySearch);
    }, [searchTerm, minPrice, maxPrice]); // Re-run when these change

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    if (loading && !products.length && !searchTerm) return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative -mx-4 px-4 py-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl overflow-hidden mb-12">
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        La marketplace <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tendance</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Achetez et vendez vos objets préférés en toute sécurité.
                        Rejoignez notre communauté de passionnés dès aujourd'hui.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="#products" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/25">
                            Découvrir les offres
                        </a>
                        <a href="/publish" className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition border border-gray-200 shadow-sm">
                            Vendre maintenant
                        </a>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </section>

            <section id="products" className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Les dernières pépites 🔥</h2>

                    <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min €"
                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                placeholder="Max €"
                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Filtrer
                        </button>
                    </form>
                </div>

                <div className="flex justify-end">
                    <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                        {products.length} résultats
                    </span>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg mb-4">Aucune annonce pour le moment.</p>
                        <a href="/publish" className="text-blue-600 font-semibold hover:underline">
                            Soyez le premier à publier une annonce !
                        </a>
                    </div>
                ) : (
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                imageUrl={product.imageUrl || ''}
                                sellerName={product.seller?.name || 'Vendeur Inconnu'}
                            />
                        ))}
                    </section>
                )}
            </section>
        </div>
    );
}
