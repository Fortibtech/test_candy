
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor(private prisma: PrismaService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // apiVersion: '2023-10-16', 
        } as any);
    }

    async createCheckoutSession(userId: number, productId: number) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        // Create a pending order
        const order = await this.prisma.order.create({
            data: {
                buyerId: userId,
                productId: product.id,
                amount: product.price,
                commission: product.price * 0.1, // 10% commission
                status: 'PENDING',
            }
        });

        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: product.title,
                                images: product.imageUrl ? [product.imageUrl] : [],
                            },
                            unit_amount: Math.round(product.price * 100), // Stripe expects cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/cancel`,
                metadata: {
                    orderId: order.id.toString(),
                    productId: product.id.toString(),
                    buyerId: userId.toString(),
                    sellerId: product.sellerId.toString(),
                },
            });

            // Update order with session ID
            await this.prisma.order.update({
                where: { id: order.id },
                data: { stripeSessionId: session.id }
            });

            return { url: session.url };
        } catch (error) {
            console.error('Stripe error:', error);
            // Cleanup pending order if session creation fails
            await this.prisma.order.delete({ where: { id: order.id } });
            throw new InternalServerErrorException('Failed to create payment session');
        }
    }
}
