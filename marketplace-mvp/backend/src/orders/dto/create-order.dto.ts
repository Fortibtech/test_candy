import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 1, description: 'ID of the product to buy' })
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ example: 1, description: 'ID of the buyer (user)' })
    @IsInt()
    @IsNotEmpty()
    buyerId: number;
}
