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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const swagger_1 = require("@nestjs/swagger");
const create_product_dto_1 = require("./dto/create-product.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAll(title, search, minPrice, maxPrice, category, sort) {
        const queryTitle = title || search;
        return this.productsService.findAll(queryTitle, minPrice, maxPrice, category, sort);
    }
    findOne(id) {
        return this.productsService.findOne(+id);
    }
    create(createProductDto, req) {
        createProductDto.sellerId = req.user.userId;
        return this.productsService.create(createProductDto);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with optional filtering' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return filtered products.' }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false, description: 'Search by title' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Alias for title search' }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: false, description: 'Minimum price' }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', required: false, description: 'Maximum price' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Product category' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, description: 'Sort order (newest, price_asc, price_desc)' }),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('minPrice')),
    __param(3, (0, common_1.Query)('maxPrice')),
    __param(4, (0, common_1.Query)('category')),
    __param(5, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the product.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The product has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map