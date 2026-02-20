
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, User, MessageCircle, ShieldCheck, Heart, Share2, AlertCircle } from 'lucide-react';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import Button from '@/components/ui/Button';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sellerId: number;
    category?: string;
    condition?: string;
    seller: {
        name: string;
        email: string;
    };
}

export default function ProductPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [contactLoading, setContactLoading] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleContactSeller = async () => {
        if (!user) {
            router.push('/auth/login');
            return;
        }
        if (!product) return;

        setContactLoading(true);
        try {
            const res = await api.post('/conversations', { productId: product.id });
            router.push(`/messages/${res.data.id}`);
        } catch (err) {
            console.error("Failed to start conversation", err);
            alert("Erreur lors de la mise en relation");
        } finally {
            setContactLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-stone-500 font-serif animate-pulse">Chargement de la pépite...</p>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-neutral-bg">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center">
                <AlertCircle size={40} className="text-stone-300" />
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">Oups, introuvable</h2>
                <p className="text-stone-500">Cet article n'existe plus ou a été retiré de la vente.</p>
            </div>
            <Button variant="primary" onClick={() => router.push('/products')}>
                Retourner à la boutique
            </Button>
        </div>
    );

    const isSeller = user?.email === product.seller?.email;

    return (
        <div className="bg-neutral-bg min-h-screen pb-20 pt-8 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb & Navigation */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 text-sm text-stone-500 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Retour
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm relative group">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out cursor-zoom-in"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-200 bg-stone-50">
                                    <ShoppingBag size={80} strokeWidth={1} />
                                </div>
                            )}
                            <button className="absolute top-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-full text-primary hover:text-red-500 hover:bg-white shadow-sm transition-all z-10 group/heart">
                                <Heart size={22} className="group-hover/heart:fill-current transition-colors" />
                            </button>
                        </div>

                        {/* Thumbnails (Simulated) */}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            <div className="w-28 h-28 flex-shrink-0 bg-white rounded-2xl overflow-hidden cursor-pointer ring-2 ring-primary ring-offset-2">
                                {product.imageUrl && <img src={product.imageUrl} className="w-full h-full object-cover" />}
                            </div>
                            {[1, 2].map(i => (
                                <div key={i} className="w-28 h-28 flex-shrink-0 bg-stone-100 rounded-2xl overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-all">
                                    {/* Placeholder for other images */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info & Actions */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <div className="sticky top-24">
                            <div className="border-b border-stone-200/50 pb-8 mb-8">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-100 text-xs font-bold tracking-widest text-stone-500 uppercase">
                                        {product.category || "Article"}
                                    </span>
                                    <button className="text-stone-400 hover:text-primary transition-colors">
                                        <Share2 size={20} strokeWidth={1.5} />
                                    </button>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-[1.1] tracking-tight">
                                    {product.title}
                                </h1>

                                <div className="flex items-end gap-4">
                                    <p className="text-4xl font-medium text-primary">
                                        {product.price.toLocaleString('fr-FR')} €
                                    </p>
                                    <p className="text-sm text-stone-500 mb-2 font-medium">Protection acheteur incluse</p>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-stone-100 shadow-sm">
                                    <ShieldCheck size={24} className="text-emerald-600 mb-1" />
                                    <span className="text-sm font-bold text-primary">Authenticité vérifiée</span>
                                    <span className="text-xs text-stone-500">Expertise incluse</span>
                                </div>
                                <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white border border-stone-100 shadow-sm">
                                    <ShoppingBag size={24} className="text-primary mb-1" />
                                    <span className="text-sm font-bold text-primary">État certifié</span>
                                    <span className="text-xs text-stone-500">{product.condition || "Très bon état"}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4 mb-12">
                                {!isSeller ? (
                                    <>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full text-lg h-16 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
                                            onClick={async () => {
                                                if (!user) {
                                                    router.push('/auth/login');
                                                    return;
                                                }
                                                try {
                                                    const res = await api.post('/payments/create-checkout-session', { productId: product.id });
                                                    window.location.href = res.data.url;
                                                } catch (err) {
                                                    console.error("Payment error", err);
                                                    alert("Erreur lors de l'initialisation du paiement");
                                                }
                                            }}
                                        >
                                            Acheter maintenant
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="w-full h-14 rounded-2xl border-stone-300 hover:border-primary hover:bg-stone-50 text-stone-600 hover:text-primary"
                                            onClick={handleContactSeller}
                                            isLoading={contactLoading}
                                            leftIcon={<MessageCircle size={20} />}
                                        >
                                            Discuter avec le vendeur
                                        </Button>
                                    </>
                                ) : (
                                    <div className="w-full bg-stone-100 text-stone-600 py-6 rounded-2xl text-center font-medium border border-stone-200">
                                        C'est votre annonce
                                    </div>
                                )}
                            </div>

                            {/* Seller & Description */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                                <div className="flex items-center gap-4 mb-6 border-b border-stone-100 pb-6">
                                    <div className="w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif font-bold text-xl shadow-md">
                                        {product.seller.name ? product.seller.name.charAt(0).toUpperCase() : <User />}
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-400 uppercase tracking-wide font-bold mb-1">Vendu par</p>
                                        <p className="text-lg font-bold text-primary">{product.seller.name || product.seller.email}</p>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <svg key={star} className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="text-xs text-stone-500 ml-2 font-medium">4.9 (12 avis)</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-stone-900 mb-3 uppercase tracking-wide">Description</h3>
                                    <p className="text-stone-600 leading-relaxed text-base font-light whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-4xl mx-auto mt-24 border-t border-stone-200 pt-16">
                    <h3 className="text-3xl font-serif font-bold text-primary mb-10 text-center">Avis de la communauté</h3>
                    <ReviewList productId={product.id} />
                    <div className="mt-12 bg-stone-50 p-8 rounded-3xl">
                        <ReviewForm productId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
