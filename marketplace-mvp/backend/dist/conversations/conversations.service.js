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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ConversationsService = class ConversationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async startConversation(buyerId, productId) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const existing = await this.prisma.conversation.findFirst({
            where: {
                buyerId,
                productId,
            }
        });
        if (existing)
            return existing;
        return this.prisma.conversation.create({
            data: {
                buyerId,
                sellerId: product.sellerId,
                productId,
            }
        });
    }
    async getUserConversations(userId) {
        return this.prisma.conversation.findMany({
            where: {
                OR: [
                    { buyerId: userId },
                    { sellerId: userId }
                ]
            },
            include: {
                product: { select: { title: true, imageUrl: true } },
                buyer: { select: { id: true, name: true, email: true } },
                seller: { select: { id: true, name: true, email: true } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
    }
    async getConversation(id, userId) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id },
            include: {
                product: true,
                buyer: { select: { id: true, name: true, email: true } },
                seller: { select: { id: true, name: true, email: true } },
                messages: { orderBy: { createdAt: 'asc' } }
            }
        });
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        if (conversation.buyerId !== userId && conversation.sellerId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return conversation;
    }
    async sendMessage(conversationId, senderId, content) {
        const conversation = await this.prisma.conversation.findUnique({ where: { id: conversationId } });
        if (!conversation)
            throw new common_1.NotFoundException('Conversation not found');
        if (conversation.buyerId !== senderId && conversation.sellerId !== senderId) {
            throw new common_1.ForbiddenException('You are not part of this conversation');
        }
        const message = await this.prisma.message.create({
            data: {
                content,
                conversationId,
                senderId,
            }
        });
        await this.prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });
        return message;
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map