
"use client";

import { useAuth } from '@/context/AuthContext';
import ConversationList from '@/components/ConversationList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MessagesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) return null;
    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Mes Messages</h1>
            <ConversationList />
        </div>
    );
}
