"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🔍 Checking database for demo user...');
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'demo@demo.com' }
        });
        if (user) {
            console.log(`✅ User found: ${user.email}`);
            console.log(`🔑 Password hash: ${user.password}`);
            const isMatch = await bcrypt.compare('password123', user.password);
            console.log(`🔓 Password 'password123' match: ${isMatch}`);
        }
        else {
            console.log('❌ User demo@demo.com NOT found.');
        }
    }
    catch (e) {
        console.error('❌ Error querying database:', e);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-user.js.map