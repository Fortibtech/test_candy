import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Marketplace Premium',
    description: 'Achetez et vendez entre particuliers',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <AuthProvider>
                    <Navbar />
                    <main className="container mx-auto py-8 px-4">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
