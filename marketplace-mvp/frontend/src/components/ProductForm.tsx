'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Button from './ui/Button';
import { UploadCloud, Tag, DollarSign, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';

const CATEGORIES = ["Montres", "Sacs de luxe", "Bijoux", "Accessoires", "Vêtements", "Autre"];
const CONDITIONS = ["Neuf avec étiquette", "Neuf sans étiquette", "Très bon état", "Bon état", "Satisfaisant"];

export default function ProductForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Autre',
        condition: 'Très bon état'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                sellerId: 0 // Backend overrides this
            };

            await api.post('/products', payload);
            router.push('/products');
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Erreur lors de la publication');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-8 max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="text-center border-b border-stone-100 pb-6">
                <p className="text-stone-500 font-medium">Vendez vos pièces d'exception</p>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-bold text-primary uppercase tracking-wide">Nom de l'article</label>
                <div className="relative">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Rolex Submariner Date"
                        className="w-full pl-4 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-stone-400"
                        required
                    />
                </div>
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-bold text-primary uppercase tracking-wide">Prix (€)</label>
                    <div className="relative">
                        <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-bold text-primary uppercase tracking-wide">Catégorie</label>
                    <div className="relative">
                        <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Condition */}
            <div className="space-y-2">
                <label htmlFor="condition" className="block text-sm font-bold text-primary uppercase tracking-wide">État de l'objet</label>
                <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                >
                    {CONDITIONS.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-bold text-primary uppercase tracking-wide">Description détaillée</label>
                <div className="relative">
                    <FileText size={18} className="absolute left-4 top-4 text-stone-400" />
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Racontez l'histoire de votre objet, son état, ses accessoires..."
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[150px] resize-y placeholder:text-stone-400"
                        required
                    />
                </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
                <label htmlFor="imageUrl" className="block text-sm font-bold text-primary uppercase tracking-wide">Photos</label>
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 hover:bg-stone-50 transition-colors text-center group cursor-pointer">
                    <div className="mb-4 flex justify-center">
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <UploadCloud size={24} className="text-stone-400 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                    <p className="text-sm font-medium text-stone-600 mb-2">Ajoutez un lien vers votre image</p>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://exemple.com/image.jpg"
                        className="w-full text-center bg-transparent border-b border-stone-300 focus:border-primary focus:outline-none py-1 text-sm text-stone-500 placeholder:text-stone-300"
                    />
                </div>
                {formData.imageUrl && (
                    <div className="mt-4 relative h-40 rounded-xl overflow-hidden border border-stone-200">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <Button
                variant="primary"
                size="lg"
                className="w-full h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                isLoading={loading}
            >
                Publier mon annonce
            </Button>
        </form>
    );
}
