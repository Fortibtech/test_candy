import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(title?: string, minPrice?: number, maxPrice?: number, category?: string, sort?: string): Promise<Product[]> {
        const where: any = {};

        if (title) {
            where.OR = [
                { title: { contains: title, mode: 'insensitive' } },
                { description: { contains: title, mode: 'insensitive' } },
                { category: { contains: title, mode: 'insensitive' } },
            ];
        }

        if (category) {
            where.category = { equals: category, mode: 'insensitive' };
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = +minPrice;
            if (maxPrice) where.price.lte = +maxPrice;
        }

        let orderBy: any = { createdAt: 'desc' };
        if (sort) {
            switch (sort) {
                case 'price_asc':
                    orderBy = { price: 'asc' };
                    break;
                case 'price_desc':
                    orderBy = { price: 'desc' };
                    break;
                case 'newest':
                    orderBy = { createdAt: 'desc' };
                    break;
            }
        }

        return this.prisma.product.findMany({
            where,
            include: { seller: { select: { name: true, email: true } } },
            orderBy
        });
    }

    async findOne(id: number): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: { id },
            include: { seller: { select: { name: true, email: true } } }
        });
    }

    async create(data: any): Promise<Product> {
        return this.prisma.product.create({
            data,
        });
    }
}
