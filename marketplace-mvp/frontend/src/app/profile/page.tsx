"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, checkAuth } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        phoneNumber: '',
        avatarUrl: ''
    });

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }
        // Fetch latest profile data
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setFormData({
                    name: res.data.name || '',
                    bio: res.data.bio || '',
                    phoneNumber: res.data.phoneNumber || '',
                    avatarUrl: res.data.avatarUrl || ''
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            await api.put('/users/profile', formData);
            setSuccess('Profil mis à jour avec succès !');
            checkAuth(); // Refresh global user state
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">

                {/* Avatar Preview (Simple URL based for MVP) */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {formData.avatarUrl ? (
                            <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold text-gray-400">{user.email.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo de profil (URL)</label>
                        <input
                            type="url"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            placeholder="https://example.com/avatar.jpg"
                            value={formData.avatarUrl}
                            onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                    <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email (Non modifiable)</label>
                    <input
                        type="text"
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500 shadow-sm sm:text-sm border p-2"
                        value={user.email}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                    <input
                        type="tel"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                    <p className="mt-2 text-sm text-gray-500">Parlez-nous de vous !</p>
                </div>

                {success && <div className="p-4 bg-green-50 text-green-700 rounded-md">{success}</div>}
                {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    );
}
