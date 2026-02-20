
"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { User, ShoppingBag, ChevronRight } from 'lucide-react';
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

    if (loading) return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-stone-50 rounded-2xl animate-pulse"></div>
            ))}
        </div>
    );

    if (!user) return null;

    if (conversations.length === 0) {
        return (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-100">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 custom-shadow text-stone-300">
                    <User size={32} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Aucune conversation</h3>
                <p className="text-stone-500 max-w-xs mx-auto">Commencez à discuter avec des vendeurs pour négocier vos pièces favorites.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {conversations.map((conv) => {
                const otherUser = conv.buyer.id === user.userId ? conv.seller : conv.buyer;
                const lastMessage = conv.messages[0];

                return (
                    <Link key={conv.id} href={`/messages/${conv.id}`} className="block bg-white p-4 rounded-2xl border border-stone-100 hover:border-primary/20 hover:shadow-soft-md transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0 border border-stone-200">
                                {conv.product.imageUrl ? (
                                    <img src={conv.product.imageUrl} alt={conv.product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                                        <ShoppingBag size={20} />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-primary text-base truncate pr-2">{conv.product.title}</h3>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 whitespace-nowrap bg-stone-50 px-2 py-0.5 rounded-full">
                                        {new Date(conv.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-stone-800 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                                    {otherUser.name || otherUser.email}
                                </p>

                                <p className="text-sm text-stone-500 truncate mt-1 group-hover:text-primary transition-colors">
                                    {lastMessage?.content || "Nouvelle conversation"}
                                </p>
                            </div>

                            <div className="text-stone-300 group-hover:text-primary transition-colors pl-2">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
