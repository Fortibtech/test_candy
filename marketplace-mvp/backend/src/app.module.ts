import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [PrismaModule, AuthModule, ProductsModule, OrdersModule, UsersModule, ConversationsModule, PaymentsModule, ReviewsModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
