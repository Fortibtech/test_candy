import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all products with optional filtering' })
    @ApiResponse({ status: 200, description: 'Return filtered products.' })
    @ApiQuery({ name: 'title', required: false, description: 'Search by title' })
    @ApiQuery({ name: 'search', required: false, description: 'Alias for title search' })
    @ApiQuery({ name: 'minPrice', required: false, description: 'Minimum price' })
    @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price' })
    @ApiQuery({ name: 'category', required: false, description: 'Product category' })
    @ApiQuery({ name: 'sort', required: false, description: 'Sort order (newest, price_asc, price_desc)' })
    findAll(
        @Query('title') title?: string,
        @Query('search') search?: string,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('category') category?: string,
        @Query('sort') sort?: string,
    ) {
        // Support both 'title' and 'search' query params
        const queryTitle = title || search;
        return this.productsService.findAll(queryTitle, minPrice, maxPrice, category, sort);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiResponse({ status: 200, description: 'Return the product.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() createProductDto: CreateProductDto, @Request() req) {
        // Override sellerId with authenticated user's ID
        createProductDto.sellerId = req.user.userId;
        return this.productsService.create(createProductDto);
    }
}
