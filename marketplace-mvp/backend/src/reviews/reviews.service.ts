
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: number, productId: number, rating: number, comment: string) {
        return this.prisma.review.create({
            data: {
                authorId: userId,
                productId,
                rating,
                comment,
            },
            include: {
                author: {
                    select: { name: true, avatarUrl: true }
                }
            }
        });
    }

    async findByProduct(productId: number) {
        return this.prisma.review.findMany({
            where: { productId },
            include: {
                author: {
                    select: { name: true, avatarUrl: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
