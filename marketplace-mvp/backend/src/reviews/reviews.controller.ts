
import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a review' })
    async create(@Request() req, @Body() body: { productId: number; rating: number; comment: string }) {
        return this.reviewsService.create(req.user.userId, body.productId, body.rating, body.comment);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'Get reviews for a product' })
    async findByProduct(@Param('productId') productId: string) {
        return this.reviewsService.findByProduct(+productId);
    }
}
