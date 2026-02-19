
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ChatWindow from '@/components/ChatWindow';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function ConversationPage() {
    const { id } = useParams(); // conversation ID
    const { user, loading } = useAuth();
    const router = useRouter();
    const [conversation, setConversation] = useState<any>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get(`/conversations/${id}`);
                setConversation(res.data);
            } catch (err) {
                console.error(err);
                router.push('/messages');
            }
        };
        if (id && user) fetchDetails();
    }, [id, user, router]);


    if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    if (!conversation) return <div className="min-h-screen flex items-center justify-center">Chargement de la conversation...</div>;

    // Determine other user name
    const otherUser = conversation.buyer.email === user.email ? conversation.seller : conversation.buyer;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 h-[calc(100vh-80px)] flex flex-col">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">{conversation.product.title}</h1>
                    <p className="text-sm text-gray-500">Discussion avec {otherUser.name || otherUser.email}</p>
                </div>
                <button onClick={() => router.push('/messages')} className="text-blue-600 hover:underline">
                    &larr; Retour
                </button>
            </div>

            <ChatWindow conversationId={+id} />
        </div>
    );
}
