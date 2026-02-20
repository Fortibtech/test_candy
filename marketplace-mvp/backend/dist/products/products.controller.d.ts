import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(title?: string, search?: string, minPrice?: number, maxPrice?: number, category?: string, sort?: string): Promise<{
        id: number;
        title: string;
        description: string;
        price: number;
        imageUrl: string | null;
        category: string;
        sellerId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        price: number;
        imageUrl: string | null;
        category: string;
        sellerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createProductDto: CreateProductDto, req: any): Promise<{
        id: number;
        title: string;
        description: string;
        price: number;
        imageUrl: string | null;
        category: string;
        sellerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
