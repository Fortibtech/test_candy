
"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ productId, onReviewAdded }: { productId: number, onReviewAdded?: () => void }) {
    const { user } = useAuth();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/auth/login');
            return;
        }
        if (rating === 0) return alert("Veuillez donner une note !");

        setLoading(true);
        try {
            await api.post('/reviews', { productId, rating, comment });
            setRating(0);
            setComment('');
            if (onReviewAdded) onReviewAdded(); // Callback to refresh list
            window.location.reload(); // Simple reload for MVP to see new review
        } catch (err) {
            console.error("Failed to post review", err);
            alert("Erreur lors de l'envoi de l'avis");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="bg-gray-50 p-6 rounded-xl text-center">
                <p className="text-gray-600 mb-4">Connectez-vous pour laisser un avis.</p>
                <button onClick={() => router.push('/auth/login')} className="text-blue-600 font-medium hover:underline">Se connecter</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Laisser un avis</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                size={24}
                                fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                                className={(hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire (optionnel)</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    rows={3}
                    placeholder="Qu'avez-vous pensé de ce produit ?"
                />
            </div>

            <button
                type="submit"
                disabled={loading || rating === 0}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Envoi...' : 'Publier mon avis'}
            </button>
        </form>
    );
}
