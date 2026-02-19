import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(title?: string, minPrice?: number, maxPrice?: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        price: number;
        imageUrl: string | null;
        sellerId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        price: number;
        imageUrl: string | null;
        sellerId: number;
    }>;
    create(createProductDto: CreateProductDto, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        price: number;
        imageUrl: string | null;
        sellerId: number;
    }>;
}
