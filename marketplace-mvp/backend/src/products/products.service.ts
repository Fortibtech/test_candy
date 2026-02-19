import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(title?: string, minPrice?: number, maxPrice?: number): Promise<Product[]> {
        const where: any = {};

        if (title) {
            where.title = { contains: title, mode: 'insensitive' };
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = +minPrice;
            if (maxPrice) where.price.lte = +maxPrice;
        }

        return this.prisma.product.findMany({
            where,
            include: { seller: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
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
