
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('create-checkout-session')
    @ApiOperation({ summary: 'Create Stripe Checkout Session' })
    async createCheckoutSession(@Request() req, @Body('productId') productId: number) {
        return this.paymentsService.createCheckoutSession(req.user.userId, productId);
    }
}
