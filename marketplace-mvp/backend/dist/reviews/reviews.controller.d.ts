import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(req: any, body: {
        productId: number;
        rating: number;
        comment: string;
    }): Promise<{
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
    findByProduct(productId: string): Promise<({
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
