import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(buyerId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        commission: number;
        status: string;
        stripeSessionId: string | null;
        buyerId: number;
        productId: number;
    }>;
    findBuyerOrders(userId: number): Promise<({
        product: {
            seller: {
                id: number;
                email: string;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            price: number;
            imageUrl: string | null;
            category: string;
            sellerId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        commission: number;
        status: string;
        stripeSessionId: string | null;
        buyerId: number;
        productId: number;
    })[]>;
    findSellerOrders(userId: number): Promise<({
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            price: number;
            imageUrl: string | null;
            category: string;
            sellerId: number;
        };
        buyer: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        commission: number;
        status: string;
        stripeSessionId: string | null;
        buyerId: number;
        productId: number;
    })[]>;
}
