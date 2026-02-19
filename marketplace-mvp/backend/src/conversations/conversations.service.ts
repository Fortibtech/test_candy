
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationsService {
    constructor(private prisma: PrismaService) { }

    async startConversation(buyerId: number, productId: number) {
        // Check if product exists
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product not found');

        // Check if conversation already exists
        const existing = await this.prisma.conversation.findFirst({
            where: {
                buyerId,
                productId,
            }
        });

        if (existing) return existing;

        return this.prisma.conversation.create({
            data: {
                buyerId,
                sellerId: product.sellerId,
                productId,
            }
        });
    }

    async getUserConversations(userId: number) {
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

    async getConversation(id: number, userId: number) {
        const conversation = await this.prisma.conversation.findUnique({
            where: { id },
            include: {
                product: true,
                buyer: { select: { id: true, name: true, email: true } },
                seller: { select: { id: true, name: true, email: true } },
                messages: { orderBy: { createdAt: 'asc' } }
            }
        });

        if (!conversation) throw new NotFoundException('Conversation not found');
        if (conversation.buyerId !== userId && conversation.sellerId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        return conversation;
    }

    async sendMessage(conversationId: number, senderId: number, content: string) {
        // Verify participation
        const conversation = await this.prisma.conversation.findUnique({ where: { id: conversationId } });
        if (!conversation) throw new NotFoundException('Conversation not found');

        if (conversation.buyerId !== senderId && conversation.sellerId !== senderId) {
            throw new ForbiddenException('You are not part of this conversation');
        }

        const message = await this.prisma.message.create({
            data: {
                content,
                conversationId,
                senderId,
            }
        });

        // Update conversation timestamp
        await this.prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return message;
    }
}
