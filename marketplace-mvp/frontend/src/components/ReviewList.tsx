
"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User, Star } from 'lucide-react';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    author: {
        name: string | null;
        avatarUrl: string | null;
    };
    createdAt: string;
}

export default function ReviewList({ productId }: { productId: number }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get(`/reviews/product/${productId}`);
                setReviews(res.data);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        };

        if (productId) fetchReviews();
    }, [productId]);

    if (loading) return <div className="animate-pulse h-20 bg-gray-50 rounded-lg"></div>;

    if (reviews.length === 0) {
        return <div className="text-gray-500 italic">Aucun avis pour le moment. Soyez le premier !</div>;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Avis ({reviews.length})</h3>
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                {review.author.avatarUrl ? (
                                    <img src={review.author.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="text-gray-500" size={20} />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{review.author.name || "Utilisateur"}</p>
                                <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                            ))}
                        </div>
                    </div>
                    {review.comment && <p className="text-gray-600 mt-2">{review.comment}</p>}
                </div>
            ))}
        </div>
    );
}
