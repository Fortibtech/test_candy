
"use client";

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <XCircle className="text-red-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement annulé</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                Vous avez annulé le paiement. Aucun montant n'a été débité.
            </p>
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
                Retourner à la boutique
            </Link>
        </div>
    );
}
