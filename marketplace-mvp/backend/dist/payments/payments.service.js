"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_1 = require("stripe");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {});
    }
    async createCheckoutSession(userId, productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { seller: true }
        });
        if (!product) {
            throw new Error('Product not found');
        }
        const order = await this.prisma.order.create({
            data: {
                buyerId: userId,
                productId: product.id,
                amount: product.price,
                commission: product.price * 0.1,
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
                            unit_amount: Math.round(product.price * 100),
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
            await this.prisma.order.update({
                where: { id: order.id },
                data: { stripeSessionId: session.id }
            });
            return { url: session.url };
        }
        catch (error) {
            console.error('Stripe error:', error);
            await this.prisma.order.delete({ where: { id: order.id } });
            throw new common_1.InternalServerErrorException('Failed to create payment session');
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map