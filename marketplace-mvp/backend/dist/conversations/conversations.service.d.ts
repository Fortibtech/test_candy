import { PrismaService } from '../prisma/prisma.service';
export declare class ConversationsService {
    private prisma;
    constructor(prisma: PrismaService);
    startConversation(buyerId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: number;
        buyerId: number;
        productId: number;
    }>;
    getUserConversations(userId: number): Promise<({
        product: {
            title: string;
            imageUrl: string;
        };
        seller: {
            id: number;
            email: string;
            name: string;
        };
        buyer: {
            id: number;
            email: string;
            name: string;
        };
        messages: {
            id: number;
            createdAt: Date;
            content: string;
            conversationId: number;
            senderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: number;
        buyerId: number;
        productId: number;
    })[]>;
    getConversation(id: number, userId: number): Promise<{
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            price: number;
            imageUrl: string | null;
            sellerId: number;
        };
        seller: {
            id: number;
            email: string;
            name: string;
        };
        buyer: {
            id: number;
            email: string;
            name: string;
        };
        messages: {
            id: number;
            createdAt: Date;
            content: string;
            conversationId: number;
            senderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: number;
        buyerId: number;
        productId: number;
    }>;
    sendMessage(conversationId: number, senderId: number, content: string): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        conversationId: number;
        senderId: number;
    }>;
}
