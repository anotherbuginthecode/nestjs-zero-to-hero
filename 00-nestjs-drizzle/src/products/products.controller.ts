import { Controller, Get, Post, Body, Delete, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get()
    getAll() {
        return this.productsService.getProducts();
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

    @Post(':id')
    async update(@Param() { id }: { id: number }, @Body() productDto: CreateProductDto) {
        return await this.productsService.updateProduct(id, productDto)
        .catch((e) => {
            throw new HttpException({
                message: e.message
            }, HttpStatus.BAD_REQUEST)
    })};

    @Delete(':id')
    async delete(@Param() { id }: { id: number }) {
        return await this.productsService.deleteProduct(id)
        .catch((e) => {
            throw new HttpException({
                message: e.message
            }, HttpStatus.BAD_REQUEST)
    })};
}
