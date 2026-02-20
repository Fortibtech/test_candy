import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findBuyerOrders(req: any): Promise<({
        product: {
            seller: {
                id: number;
                email: string;
                name: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            price: number;
            imageUrl: string | null;
            category: string;
            sellerId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        commission: number;
        status: string;
        stripeSessionId: string | null;
        buyerId: number;
        productId: number;
    })[]>;
    findSellerOrders(req: any): Promise<({
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            title: string;
            price: number;
            imageUrl: string | null;
            category: string;
            sellerId: number;
        };
        buyer: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        commission: number;
        status: string;
        stripeSessionId: string | null;
        buyerId: number;
        productId: number;
    })[]>;
    create(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        commission: number;
        status: string;
        stripeSessionId: string | null;
        buyerId: number;
        productId: number;
    }>;
}
