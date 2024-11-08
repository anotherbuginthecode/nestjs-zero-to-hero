import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateProductSchema } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get()
    getAll() {
        return 'This will return all products';
    }

    @Get(':id')
    getOne() {
        return 'This will return one product';
    }

    @UsePipes(ZodValidationPipe)
    @Post()
    async create(@Body() product: CreateProductSchema) {
        const newProduct = await this.productsService.addProduct(product);
        
        return newProduct;
    }
}
