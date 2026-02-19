import { ConversationsService } from './conversations.service';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    startConversation(req: any, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: number;
        buyerId: number;
        productId: number;
    }>;
    getUserConversations(req: any): Promise<({
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
    getConversation(req: any, id: string): Promise<{
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
    sendMessage(req: any, id: string, content: string): Promise<{
        id: number;
        createdAt: Date;
        content: string;
        conversationId: number;
        senderId: number;
    }>;
}
