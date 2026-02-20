"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting seed...');
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
    const products = [
        {
            title: 'iPhone 15 Pro Max',
            description: 'Comme neuf, utilisé seulement 2 mois. Vendu avec boîte et accessoires d\'origine. Facture disponible.',
            price: 1150.00,
            imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
            category: 'Accessoires',
            sellerId: user.id,
        },
        {
            title: 'Vélo de course Vintage',
            description: 'Vélo Peugeot des années 80, entièrement restauré. Idéal pour la ville ou les balades le week-end.',
            price: 250.00,
            imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
            category: 'Autre',
            sellerId: user.id,
        },
        {
            title: 'MacBook Air M2',
            description: 'Couleur Minuit, 256Go SSD, 8Go RAM. Parfait état, batterie à 100%.',
            price: 950.00,
            imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
            category: 'Accessoires',
            sellerId: user.id,
        },
        {
            title: 'Sac Chanel Timeless',
            description: 'Sac classique Chanel en cuir noir. Excellent état, avec carte d\'authenticité.',
            price: 4500.00,
            imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
            category: 'Sacs de luxe',
            sellerId: user.id,
        },
        {
            title: 'Rolex Submariner Date',
            description: 'Modèle 2020, full set. Peu portée, état irreprochable. Révision faite.',
            price: 12500.00,
            imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
            category: 'Montres',
            sellerId: user.id,
        },
        {
            title: 'Air Jordan 1 High Chicago',
            description: 'Pointure 43. Neuves jamais portées (DS). Facture SNKRS.',
            price: 450.00,
            imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
            category: 'Sneakers',
            sellerId: user.id,
        },
        {
            title: 'Bague Cartier Love',
            description: 'Or jaune 18k, taille 52. Avec écrin et certificat.',
            price: 1800.00,
            imageUrl: 'https://images.unsplash.com/photo-1605100804763-ebea2406a95f?auto=format&fit=crop&q=80&w=800',
            category: 'Joaillerie',
            sellerId: user.id,
        },
        {
            title: 'Veste en cuir Saint Laurent',
            description: 'Taille 48. Cuir d\'agneau véritable, style motard.',
            price: 2200.00,
            imageUrl: 'https://images.unsplash.com/photo-1551028919-ac665ef05c29?auto=format&fit=crop&q=80&w=800',
            category: 'Vêtements',
            sellerId: user.id,
        },
        {
            title: 'Montre Omega Speedmaster',
            description: 'Moonwatch Professional. Verre saphir. Bracelet acier.',
            price: 6200.00,
            imageUrl: 'https://images.unsplash.com/photo-1622434641406-a158105c9168?auto=format&fit=crop&q=80&w=800',
            category: 'Montres',
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
//# sourceMappingURL=seed.js.map