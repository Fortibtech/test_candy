
"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { User, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Conversation {
    id: number;
    product: {
        title: string;
        imageUrl: string | null;
    };
    buyer: { id: number; name: string | null; email: string };
    seller: { id: number; name: string | null; email: string };
    messages: { content: string; createdAt: string }[];
    updatedAt: string;
}

export default function ConversationList() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!user) return;
            try {
                const res = await api.get('/conversations');
                setConversations(res.data);
            } catch (err) {
                console.error("Failed to fetch conversations", err);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, [user]);

    if (loading) return <div className="animate-pulse h-20 bg-gray-100 rounded-lg"></div>;
    if (!user) return null;

    if (conversations.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Aucune conversation pour le moment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {conversations.map((conv) => {
                const otherUser = conv.buyer.id === user.userId ? conv.seller : conv.buyer;

                return (
                    <Link key={conv.id} href={`/messages/${conv.id}`} className="block bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition card-hover">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                {conv.product.imageUrl ? (
                                    <img src={conv.product.imageUrl} alt={conv.product.title} className="w-full h-full object-cover" />
                                ) : (
                                    <ShoppingBag className="text-gray-400" size={20} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-900 truncate">{conv.product.title}</h3>
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                        {new Date(conv.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-sm font-medium text-gray-700 truncate">
                                        {otherUser.name || otherUser.email}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 truncate mt-0.5">
                                    {conv.messages[0]?.content || "Nouvelle conversation"}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
