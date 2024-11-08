import { Controller, Get, Post, Body, UsePipes, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get()
    getAll() {
        return 'This will return all products';
    }

    @Get(':id')
    async getOne(@Param() { id }: { id: number }) {
        return await this.productsService.getProductById(id)
    }

    @Post()
    async create(@Body() productDto: CreateProductDto) {
        return await this.productsService.addProduct(productDto)
        .catch((e) => {
            throw new HttpException({
                message: e.message
            }, HttpStatus.BAD_REQUEST)
    })};
}
