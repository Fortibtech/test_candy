import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async createOrder(buyerId: number, productId: number) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product not found');

        // Commission Logic: Platform fee is 10%
        const commissionRate = 0.10;
        const commission = product.price * commissionRate;
        const totalAmount = product.price; // Assuming price includes commission or is base price. 
        // Clarification: "prix_vendeur + 10% de frais plateforme" usually means Buyer pays Price + 10%.
        // Let's assume Product Price is Seller Price.
        const platformFee = product.price * 0.10;
        const finalAmount = product.price + platformFee;

        return this.prisma.order.create({
            data: {
                buyerId,
                productId,
                amount: finalAmount,
                commission: platformFee,
                status: 'PENDING',
            },
        });
    }

    async findBuyerOrders(userId: number) {
        return this.prisma.order.findMany({
            where: { buyerId: userId },
            include: {
                product: {
                    include: {
                        seller: {
                            select: { id: true, name: true, email: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findSellerOrders(userId: number) {
        // Find products where sellerId is userId, then find orders for those products
        // OR directly join if implicit relation (Product -> Order) is clear.
        // Prisma: Order has relation to Product. Product has relation to Seller(User).
        return this.prisma.order.findMany({
            where: {
                product: {
                    sellerId: userId
                }
            },
            include: {
                product: true,
                buyer: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
