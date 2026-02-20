import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(title?: string, minPrice?: number, maxPrice?: number, category?: string, sort?: string): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    create(data: any): Promise<Product>;
}
