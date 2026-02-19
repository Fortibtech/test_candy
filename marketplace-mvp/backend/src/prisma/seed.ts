import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create a Demo User
    const password = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'demo@demo.com' },
        update: {},
        create: {
            email: 'demo@demo.com',
            name: 'Demo User',
            password,
        },
    });

    console.log(`👤 Created user: ${user.email} (password: password123)`);

    // 2. Create Sample Products
    const products = [
        {
            title: 'iPhone 15 Pro Max',
            description: 'Comme neuf, utilisé seulement 2 mois. Vendu avec boîte et accessoires d\'origine. Facture disponible.',
            price: 1150.00,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
            sellerId: user.id,
        },
        {
            title: 'Vélo de course Vintage',
            description: 'Vélo Peugeot des années 80, entièrement restauré. Idéal pour la ville ou les balades le week-end.',
            price: 250.00,
            imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
            sellerId: user.id,
        },
        {
            title: 'MacBook Air M2',
            description: 'Couleur Minuit, 256Go SSD, 8Go RAM. Parfait état, batterie à 100%.',
            price: 950.00,
            imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
            sellerId: user.id,
        },
        {
            title: 'Canapé Scandinave 3 places',
            description: 'Canapé gris clair, très confortable. Acheté il y a un an.',
            price: 300.00,
            imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
            sellerId: user.id,
        },
        {
            title: 'Sony PlayStation 5',
            description: 'Console PS5 édition standard avec lecteur disque. Manette DualSense incluse.',
            price: 450.00,
            imageUrl: 'https://images.unsplash.com/photo-1606144042614-b25172b0aa04?auto=format&fit=crop&q=80&w=800',
            sellerId: user.id,
        },
        {
            title: 'Appareil Photo Fujifilm X-T30',
            description: 'Vendu avec objectif 18-55mm. Idéal pour débuter la photo.',
            price: 800.00,
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
            sellerId: user.id,
        }
    ];

    for (const product of products) {
        const p = await prisma.product.create({
            data: product,
        });
        console.log(`📦 Created product: ${p.title}`);
    }

    console.log('✅ Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
