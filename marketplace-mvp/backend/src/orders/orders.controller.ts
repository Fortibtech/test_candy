import { Controller, Post, Body, Get, Request, UseGuards, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get('buyer')
    @ApiOperation({ summary: 'Get orders where current user is buyer' })
    findBuyerOrders(@Request() req) {
        return this.ordersService.findBuyerOrders(req.user.userId);
    }

    @Get('seller')
    @ApiOperation({ summary: 'Get orders where current user is seller' })
    findSellerOrders(@Request() req) {
        return this.ordersService.findSellerOrders(req.user.userId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new order (Buy product)' })
    @ApiResponse({ status: 201, description: 'Order created successfully.' })
    @ApiResponse({ status: 404, description: 'Product or User not found.' })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto.buyerId, createOrderDto.productId);
    }
}
