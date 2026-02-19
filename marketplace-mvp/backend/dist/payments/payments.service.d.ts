import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    private stripe;
    constructor(prisma: PrismaService);
    createCheckoutSession(userId: number, productId: number): Promise<{
        url: string;
    }>;
}
