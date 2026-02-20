import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sellerName: string;
    category?: string;
}

export default function ProductCard({ id, title, price, imageUrl, sellerName, category }: ProductProps) {
    return (
        <Link href={`/products/${id}`} className="block group cursor-pointer">
            <div className="bg-transparent h-full flex flex-col gap-3">
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-sand w-full overflow-hidden rounded-2xl mb-1 shadow-soft-sm group-hover:shadow-soft-lg transition-all duration-500 ease-out">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-sand text-stone-300">
                            <ShoppingBag className="w-10 h-10 opacity-30" />
                        </div>
                    )}

                    {/* Overlay gradient for text readability if needed, or just hover effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

                    {/* Like Button - Appears on Hover */}
                    <button
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-400 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Handle like logic here
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col px-1">
                    <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col">
                            {/* Brand/Seller text - Uppercase & Small */}
                            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">
                                {category || sellerName}
                            </span>

                            {/* Title - Elegant Serif or Clean Sans */}
                            <h3 className="text-base font-medium text-primary leading-tight line-clamp-1 group-hover:text-accent transition-colors duration-300">
                                {title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <p className="text-base font-semibold text-primary">
                            {price.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} €
                        </p>
                        {/* Example of subtle micro-interaction element */}
                        <span className="text-xs text-stone-400 group-hover:text-primary transition-colors duration-300">
                            Voir l'article
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
