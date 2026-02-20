
"use client";

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-neutral-bg">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-sm border border-emerald-100 animate-in zoom-in duration-500">
                <CheckCircle className="text-emerald-600" size={48} strokeWidth={1.5} />
            </div>

            <h1 className="text-4xl font-serif font-bold text-primary mb-4 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                Commande confirmée
            </h1>

            <p className="text-stone-500 mb-10 max-w-md text-lg leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
                Merci pour votre confiance. Votre commande a été enregistrée avec succès. Vous recevrez bientôt un email de confirmation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs animate-in slide-in-from-bottom-4 duration-700 delay-300">
                <Link href="/orders" className="w-full">
                    <div className="w-full px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 text-center">
                        Voir ma commande
                    </div>
                </Link>
                <Link href="/products" className="w-full">
                    <div className="w-full px-6 py-4 bg-white text-stone-600 border border-stone-200 rounded-xl font-bold hover:bg-stone-50 hover:text-primary transition-all text-center">
                        Continuer vos achats
                    </div>
                </Link>
            </div>
        </div>
    );
}
