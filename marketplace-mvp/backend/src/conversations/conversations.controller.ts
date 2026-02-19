
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('conversations')
@ApiBearerAuth()
@Controller('conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    @Post()
    @ApiOperation({ summary: 'Start a conversation for a product' })
    startConversation(@Request() req, @Body('productId') productId: number) {
        return this.conversationsService.startConversation(req.user.userId, productId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all conversations for current user' })
    getUserConversations(@Request() req) {
        return this.conversationsService.getUserConversations(req.user.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific conversation with messages' })
    getConversation(@Request() req, @Param('id') id: string) {
        return this.conversationsService.getConversation(+id, req.user.userId);
    }

    @Post(':id/messages')
    @ApiOperation({ summary: 'Send a message' })
    sendMessage(@Request() req, @Param('id') id: string, @Body('content') content: string) {
        return this.conversationsService.sendMessage(+id, req.user.userId, content);
    }
}
