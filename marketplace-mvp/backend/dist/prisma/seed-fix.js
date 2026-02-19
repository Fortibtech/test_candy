"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting seed fix...');
    try {
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
        console.log(`👤 Created user: ${user.email}`);
        const products = [
            {
                title: 'iPhone 15 Pro Max',
                description: 'Comme neuf, utilisé seulement 2 mois.',
                price: 1150.00,
                imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
                sellerId: user.id,
            },
            {
                title: 'Vélo de course Vintage',
                description: 'Vélo Peugeot des années 80, entièrement restauré.',
                price: 250.00,
                imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
                sellerId: user.id,
            }
        ];
        for (const product of products) {
            const existing = await prisma.product.findFirst({
                where: { title: product.title }
            });
            if (!existing) {
                await prisma.product.create({
                    data: product,
                });
                console.log(`📦 Created product: ${product.title}`);
            }
            else {
                console.log(`⚠️ Product already exists: ${product.title}`);
            }
        }
        console.log('✅ Seeding completed successfully.');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-fix.js.map