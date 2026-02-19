import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sellerName: string;
}

export default function ProductCard({ id, title, price, imageUrl, sellerName }: ProductProps) {
    return (
        <Link href={`/products/${id}`} className="block group">
            <div className="bg-transparent h-full flex flex-col">
                <div className="relative aspect-[4/5] bg-neutral-bg w-full overflow-hidden rounded-sm mb-3">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <ShoppingBag className="w-8 h-8 opacity-20" />
                        </div>
                    )}
                    {/* Minimalist Badge */}
                    {/* <div className="absolute top-2 right-2 bg-white px-2 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider z-10">
                        Top Seller
                    </div> */}
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-primary line-clamp-1 group-hover:underline decoration-1 underline-offset-2">
                            {title}
                        </h3>
                        {/* <Heart size={16} className="text-gray-400 hover:text-accent cursor-pointer ml-2 flex-shrink-0" /> */}
                    </div>

                    <p className="text-xs text-gray-500 mt-1 mb-2 font-light">
                        {sellerName}
                    </p>

                    <p className="text-sm font-semibold text-primary mt-auto">
                        {price.toLocaleString('fr-FR')} €
                    </p>
                </div>
            </div>
        </Link>
    );
}
