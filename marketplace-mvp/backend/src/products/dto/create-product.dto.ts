import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'The title of the product', example: 'Vintage Camera' })
    title: string;

    @ApiProperty({ description: 'Description of the product', example: 'A classic 1970s film camera.' })
    description: string;

    @ApiProperty({ description: 'Price of the product', example: 150.00 })
    price: number;

    @ApiProperty({ description: 'Image URL of the product', required: false, example: 'https://example.com/image.jpg' })
    imageUrl?: string;

    @ApiProperty({ description: 'ID of the seller', example: 1 })
    sellerId: number;
}
