
"use client";

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-neutral-bg">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 shadow-sm border border-red-100 animate-in zoom-in duration-500">
                <XCircle className="text-error" size={48} strokeWidth={1.5} />
            </div>

            <h1 className="text-4xl font-serif font-bold text-primary mb-4 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                Paiement annulé
            </h1>

            <p className="text-stone-500 mb-10 max-w-md text-lg leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-200">
                La transaction n'a pas abouti. Aucun montant n'a été débité de votre compte. N'hésitez pas à réessayer si c'était une erreur.
            </p>

            <div className="w-full max-w-xs animate-in slide-in-from-bottom-4 duration-700 delay-300">
                <Link href="/products">
                    <div className="w-full px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 text-center">
                        Retourner à la boutique
                    </div>
                </Link>
            </div>
        </div>
    );
}
