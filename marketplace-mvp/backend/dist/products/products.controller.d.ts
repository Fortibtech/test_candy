import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(title?: string, minPrice?: number, maxPrice?: number): Promise<{
        id: number;
        title: string;
        description: string;
        price: number;
        imageUrl: string | null;
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
        sellerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
