"use client";

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Filter, ChevronDown, Search } from 'lucide-react';

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

const SORT_OPTIONS = [
    { label: 'Plus récents', value: 'newest' },
    { label: 'Prix croissant', value: 'price_asc' },
    { label: 'Prix décroissant', value: 'price_desc' },
];

const FILTERS = {
    categories: ['Sacs de luxe', 'Montres', 'Sneakers', 'Joaillerie', 'Vêtements', 'Accessoires'],
    conditions: ['Neuf avec étiquette', 'Très bon état', 'Bon état', 'Satisfaisant'],
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('newest');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            // Search Query from URL
            if (typeof window !== 'undefined') {
                const searchParams = new URLSearchParams(window.location.search);
                const searchQuery = searchParams.get('search');
                if (searchQuery) params.append('search', searchQuery);
            }

            // Filters
            if (selectedCategory) params.append('category', selectedCategory);
            if (priceRange.min) params.append('minPrice', priceRange.min);
            if (priceRange.max) params.append('maxPrice', priceRange.max);

            // Sorting
            if (sortBy) {
                params.append('sort', sortBy);
            }

            const response = await api.get(`/products?${params.toString()}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, sortBy, priceRange.min, priceRange.max]);

    // Listen to URL changes for search
    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetchProducts();
        }
    }, [typeof window !== 'undefined' ? window.location.search : '']);


    return (
        <div className="bg-neutral-bg min-h-screen pt-8 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Boutique</span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-1">
                            Toute la collection
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pr-4">
                        <div>
                            <h3 className="font-bold text-primary mb-4">Catégories</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`block text-sm ${!selectedCategory ? 'font-bold text-primary' : 'text-stone-500 hover:text-primary'} transition-colors`}
                                >
                                    Tout voir
                                </button>
                                {FILTERS.categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`block text-sm text-left w-full ${selectedCategory === cat ? 'font-bold text-primary' : 'text-stone-500 hover:text-primary'} transition-colors`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-stone-200 w-full" />

                        <div>
                            <h3 className="font-bold text-primary mb-4">Prix</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <Input
                                    placeholder="Min"
                                    className="h-9 text-sm"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    type="number"
                                />
                                <span className="text-stone-400">-</span>
                                <Input
                                    placeholder="Max"
                                    className="h-9 text-sm"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    type="number"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-stone-200 w-full" />

                        <div>
                            <h3 className="font-bold text-primary mb-4">État</h3>
                            {FILTERS.conditions.map(cond => (
                                <label key={cond} className="flex items-center gap-2 mb-2 cursor-pointer group">
                                    <div className="w-4 h-4 rounded border border-stone-300 group-hover:border-primary transition-colors"></div>
                                    <span className="text-sm text-stone-600 group-hover:text-primary">{cond}</span>
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Mobile Filters & Sort Bar */}
                        <div className="lg:hidden flex justify-between items-center mb-6 sticky top-24 z-30 bg-neutral-bg/95 backdrop-blur py-2">
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<Filter size={16} />}
                                onClick={() => setShowMobileFilters(true)}
                                className="bg-white"
                            >
                                Filtres
                            </Button>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-transparent text-sm font-medium text-primary pr-8 outline-none cursor-pointer"
                                >
                                    {SORT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500" />
                            </div>
                        </div>

                        {/* Mobile Filter Drawer */}
                        {showMobileFilters && (
                            <div className="fixed inset-0 z-50 lg:hidden">
                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                                    onClick={() => setShowMobileFilters(false)}
                                />

                                {/* Drawer Panel */}
                                <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                                    <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center bg-white z-10">
                                        <h2 className="text-xl font-serif font-bold text-primary">Filtres</h2>
                                        <button
                                            onClick={() => setShowMobileFilters(false)}
                                            className="p-2 -mr-2 text-stone-400 hover:text-primary transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                                        {/* Categories */}
                                        <div>
                                            <h3 className="font-bold text-primary mb-4 text-base">Catégories</h3>
                                            <div className="space-y-3">
                                                <button
                                                    onClick={() => setSelectedCategory(null)}
                                                    className={`flex items-center w-full text-sm ${!selectedCategory ? 'font-bold text-primary' : 'text-stone-500'}`}
                                                >
                                                    <span className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${!selectedCategory ? 'border-primary' : 'border-stone-300'}`}>
                                                        {!selectedCategory && <span className="w-2 h-2 rounded-full bg-primary" />}
                                                    </span>
                                                    Tout voir
                                                </button>
                                                {FILTERS.categories.map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => setSelectedCategory(cat)}
                                                        className={`flex items-center w-full text-left text-sm ${selectedCategory === cat ? 'font-bold text-primary' : 'text-stone-500'}`}
                                                    >
                                                        <span className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${selectedCategory === cat ? 'border-primary' : 'border-stone-300'}`}>
                                                            {selectedCategory === cat && <span className="w-2 h-2 rounded-full bg-primary" />}
                                                        </span>
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-px bg-stone-100 w-full" />

                                        {/* Price */}
                                        <div>
                                            <h3 className="font-bold text-primary mb-4 text-base">Prix</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <label className="text-xs text-stone-500 mb-1 block">Minimum</label>
                                                    <Input
                                                        placeholder="0 €"
                                                        value={priceRange.min}
                                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                                        type="number"
                                                        className="text-sm"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs text-stone-500 mb-1 block">Maximum</label>
                                                    <Input
                                                        placeholder="Max"
                                                        value={priceRange.max}
                                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                                        type="number"
                                                        className="text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px bg-stone-100 w-full" />

                                        {/* Condition */}
                                        <div>
                                            <h3 className="font-bold text-primary mb-4 text-base">État</h3>
                                            <div className="space-y-3">
                                                {FILTERS.conditions.map(cond => (
                                                    <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                                                        <div className="w-5 h-5 rounded border border-stone-300 flex items-center justify-center group-hover:border-primary transition-colors">
                                                            {/* Checkbox state logic not implemented for multiple selection in MVP */}
                                                        </div>
                                                        <span className="text-sm text-stone-600 group-hover:text-primary">{cond}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="p-6 border-t border-stone-100 bg-stone-50/50">
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="flex-1 justify-center border-stone-200 bg-white"
                                                onClick={() => {
                                                    setSelectedCategory(null);
                                                    setPriceRange({ min: '', max: '' });
                                                }}
                                            >
                                                Réinitialiser
                                            </Button>
                                            <Button
                                                variant="primary"
                                                className="flex-1 justify-center"
                                                onClick={() => {
                                                    fetchProducts();
                                                    setShowMobileFilters(false);
                                                }}
                                            >
                                                Voir les résultats
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sort Bar Desktop */}
                        <div className="hidden lg:flex justify-end mb-6">
                            <div className="flex items-center gap-2 text-sm text-stone-500">
                                <span>Trier par:</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-transparent font-medium text-primary pr-6 border-none outline-none cursor-pointer focus:ring-0"
                                    >
                                        {SORT_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-900" />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-[4/5] bg-stone-100 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm text-center px-6">
                                <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                                    <Search size={32} className="text-stone-300" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-primary mb-2">Aucun résultat trouvé</h3>
                                <p className="text-stone-500 max-w-md mx-auto mb-8">
                                    Nous n'avons pas trouvé de produits correspondant à votre recherche. Essayez d'autres mots-clés ou modifiez vos filtres.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setPriceRange({ min: '', max: '' });
                                        setSortBy('newest');
                                        const url = new URL(window.location.href);
                                        url.searchParams.delete('search');
                                        window.history.pushState({}, '', url.toString());
                                        fetchProducts();
                                    }}
                                >
                                    Effacer tous les filtres
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        imageUrl={product.imageUrl || ''}
                                        sellerName={product.seller?.name || 'Vendeur Inconnu'}
                                        category={product.category}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
