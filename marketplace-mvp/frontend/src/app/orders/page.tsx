
"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import OrderCard from '@/components/OrderCard';
import { ShoppingBag, Tag } from 'lucide-react';

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'purchases' | 'sales'>('purchases');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [authLoading, user, router]);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const endpoint = activeTab === 'purchases' ? '/orders/buyer' : '/orders/seller';
                const res = await api.get(endpoint);
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, activeTab]);

    if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes Commandes</h1>

            <div className="flex border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('purchases')}
                    className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'purchases'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <ShoppingBag size={18} />
                    Mes Achats
                </button>
                <button
                    onClick={() => setActiveTab('sales')}
                    className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'sales'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <Tag size={18} />
                    Mes Ventes
                </button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-50 h-32 rounded-xl"></div>
                    ))}
                </div>
            ) : orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order: any) => (
                        <OrderCard key={order.id} order={order} type={activeTab === 'purchases' ? 'buyer' : 'seller'} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">Aucune commande trouvée.</p>
                </div>
            )}
        </div>
    );
}
