
"use client";

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement réussi !</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                Merci pour votre achat. Votre commande a été enregistrée et le vendeur a été notifié.
            </p>
            <div className="flex gap-4">
                <Link href="/" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition">
                    Retour à l'accueil
                </Link>
                {/* Future: Link to order details */}
            </div>
        </div>
    );
}
