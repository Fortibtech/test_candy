
"use client";

import { ShoppingBag, Calendar, User, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
    id: number;
    amount: number;
    status: string;
    createdAt: string;
    product: {
        id: number;
        title: string;
        imageUrl: string | null;
        seller?: {
            name: string | null;
            email: string | null;
        };
    };
    buyer?: {
        name: string | null;
        email: string | null;
    };
}

interface OrderCardProps {
    order: Order;
    type: 'buyer' | 'seller';
}

export default function OrderCard({ order, type }: OrderCardProps) {
    const isBuyer = type === 'buyer';
    const otherUser = isBuyer ? order.product.seller : order.buyer;
    const statusColor = {
        'PENDING': 'bg-yellow-100 text-yellow-800',
        'COMPLETED': 'bg-green-100 text-green-800',
        'CANCELLED': 'bg-red-100 text-red-800',
    }[order.status] || 'bg-gray-100 text-gray-800';

    const statusLabel = {
        'PENDING': 'En attente',
        'COMPLETED': 'Terminée',
        'CANCELLED': 'Annulée',
    }[order.status] || order.status;

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-32 h-32 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {order.product.imageUrl ? (
                    <Image
                        src={order.product.imageUrl}
                        alt={order.product.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={32} />
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{order.product.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                            {statusLabel}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar size={14} />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="font-semibold text-gray-900">{order.amount} €</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg w-fit">
                        <User size={14} />
                        <span>
                            {isBuyer ? 'Vendeur' : 'Acheteur'} : <span className="font-medium">{otherUser?.name || otherUser?.email || 'Inconnu'}</span>
                        </span>
                    </div>
                </div>

                <div className="flex justify-end mt-4 md:mt-0 gap-3">
                    {/* Actions can be added here, e.g., "Contact", "Review" */}
                    <Link
                        href={`/products/${order.product.id}`}
                        className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1"
                    >
                        Voir le produit
                    </Link>
                </div>
            </div>
        </div>
    );
}
