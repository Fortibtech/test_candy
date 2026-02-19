import { PrismaService } from '../prisma/prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, productId: number, rating: number, comment: string): Promise<{
        author: {
            name: string;
            avatarUrl: string;
        };
    } & {
        id: number;
        createdAt: Date;
        productId: number;
        rating: number;
        comment: string | null;
        authorId: number;
    }>;
    findByProduct(productId: number): Promise<({
        author: {
            name: string;
            avatarUrl: string;
        };
    } & {
        id: number;
        createdAt: Date;
        productId: number;
        rating: number;
        comment: string | null;
        authorId: number;
    })[]>;
}
