
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, User, MessageCircle } from 'lucide-react';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    sellerId: number;
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

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Produit non trouvé</div>;

    const isSeller = user?.email === product.seller?.email; // Safe access

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingBag size={64} />
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
                        <p className="text-2xl font-semibold text-blue-600">{product.price.toLocaleString()} €</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                                {product.seller.name ? product.seller.name.charAt(0).toUpperCase() : <User />}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Vendu par</p>
                                <p className="text-lg font-medium text-gray-900">{product.seller.name || product.seller.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleContactSeller}
                            disabled={contactLoading}
                            className="w-full flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition shadow-sm font-medium mb-3"
                        >
                            <MessageCircle size={20} />
                            {contactLoading ? 'Création...' : 'Discuter avec le vendeur'}
                        </button>
                        {!isSeller && (
                            <button
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
                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition shadow-lg shadow-green-600/20 font-bold text-lg"
                            >
                                Acheter maintenant
                            </button>
                        )}
                        {isSeller && (
                            <div className="w-full bg-gray-200 text-gray-600 py-3 rounded-lg text-center font-medium">
                                C'est votre annonce
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-8 mt-8">
                        <ReviewList productId={product.id} />
                        <div className="mt-8">
                            <ReviewForm productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
