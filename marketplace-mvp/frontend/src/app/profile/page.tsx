"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { User, ShieldCheck, Mail, Phone, MapPin, Star, Package, CreditCard } from 'lucide-react';

export default function ProfilePage() {
    const { user, checkAuth } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('info');

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
            checkAuth();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="bg-neutral-bg min-h-screen pb-20 pt-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-stone-50 shadow-md">
                            {formData.avatarUrl ? (
                                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                                    <User size={48} />
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors border border-stone-100">
                            <ShieldCheck size={18} fill="#C6A87C" className="text-white" />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h1 className="text-3xl font-serif font-bold text-primary">{formData.name || user.email}</h1>
                        <p className="text-stone-500 font-medium flex items-center justify-center md:justify-start gap-2">
                            <MapPin size={16} /> Paris, France
                        </p>
                        <p className="text-stone-400 text-sm max-w-lg mx-auto md:mx-0 leading-relaxed">
                            {formData.bio || "Aucune bio renseignée."}
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
                            <div className="text-center">
                                <span className="block text-xl font-bold text-primary">0</span>
                                <span className="text-xs text-stone-500 uppercase tracking-wider">Ventes</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl font-bold text-primary">0</span>
                                <span className="text-xs text-stone-500 uppercase tracking-wider">Achats</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xl font-bold text-primary flex items-center gap-1">
                                    4.9 <Star size={14} className="fill-accent text-accent" />
                                </span>
                                <span className="text-xs text-stone-500 uppercase tracking-wider">Note</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="flex gap-8 border-b border-stone-200 mb-8">
                    {['info', 'ventes', 'achats'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-stone-400 hover:text-stone-600'
                                }`}
                        >
                            {tab === 'info' && 'Mes Infos'}
                            {tab === 'ventes' && 'Mes Ventes'}
                            {tab === 'achats' && 'Mes Achats'}
                        </button>
                    ))}
                </div>

                {activeTab === 'info' && (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">Nom complet</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    icon={<User size={18} />}
                                    placeholder="Jean Dupont"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                                <Input
                                    value={user.email}
                                    disabled
                                    icon={<Mail size={18} />}
                                    className="bg-stone-50 text-stone-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">Téléphone</label>
                                <Input
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    icon={<Phone size={18} />}
                                    placeholder="+33 6 12 34 56 78"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">Photo de profil (URL)</label>
                                <Input
                                    value={formData.avatarUrl}
                                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Bio</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-stone-600 placeholder:text-stone-300"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Dites en plus sur vous..."
                            />
                        </div>

                        {success && (
                            <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
                                <ShieldCheck size={18} /> {success}
                            </div>
                        )}
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <Button type="submit" isLoading={loading} size="lg">
                                Enregistrer les modifications
                            </Button>
                        </div>
                    </form>
                )}

                {activeTab === 'ventes' && (
                    <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <Package className="mx-auto h-12 w-12 text-stone-300 mb-4" />
                        <h3 className="text-lg font-bold text-stone-600 mb-2">Vous n'avez pas encore de ventes</h3>
                        <p className="text-stone-400 mb-6">Mettez en vente votre premier article dès aujourd'hui.</p>
                        <Button onClick={() => router.push('/publish')}>Vendre un article</Button>
                    </div>
                )}

                {activeTab === 'achats' && (
                    <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <CreditCard className="mx-auto h-12 w-12 text-stone-300 mb-4" />
                        <h3 className="text-lg font-bold text-stone-600 mb-2">Vos commandes apparaîtront ici</h3>
                        <p className="text-stone-400 mb-6">Explorez la boutique pour trouver votre prochaine pépite.</p>
                        <Button variant="outline" onClick={() => router.push('/products')}>Découvrir la boutique</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
