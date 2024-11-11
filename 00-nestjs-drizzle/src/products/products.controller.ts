import { Controller, Get, Post, Put, Body, Delete, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

/**
 * Controller for handling product-related requests.
 */
@Controller('products')
export class ProductsController {

    /**
     * Constructs a new ProductsController.
     * @param productsService - The service used to manage products.
     */
    constructor(private productsService: ProductsService) {}

    /**
     * Retrieves all products.
     * @returns An array of products.
     */
    @Get()
    getAll() {
        return this.productsService.getProducts();
    }

    /**
     * Retrieves a single product by its ID.
     * @param id - The ID of the product to retrieve.
     * @returns The product with the specified ID.
     */
    @Get(':id')
    async getOne(@Param() { id }: { id: number }) {
        return await this.productsService.getProductById(id);
    }

    /**
     * Creates a new product.
     * @param productDto - The data transfer object containing the product details.
     * @returns The created product.
     * @throws HttpException if there is an error during creation.
     */
    @Post()
    async create(@Body() productDto: CreateProductDto) {
        return await this.productsService.addProduct(productDto)
        .catch((e) => {
            throw new HttpException({
                message: e.message
            }, HttpStatus.BAD_REQUEST);
        });
    }

    /**
     * Updates an existing product.
     * @param id - The ID of the product to update.
     * @param productDto - The data transfer object containing the updated product details.
     * @returns The updated product.
     * @throws HttpException if there is an error during update.
     */
    @Put(':id')
    async update(@Param() { id }: { id: number }, @Body() productDto: CreateProductDto) {
        return await this.productsService.updateProduct(id, productDto)
        .catch((e) => {
            throw new HttpException({
                message: e.message
            }, HttpStatus.BAD_REQUEST);
        });
    }

    /**
     * Deletes a product by its ID.
     * @param id - The ID of the product to delete.
     * @returns A confirmation message.
     * @throws HttpException if there is an error during deletion.
     */
    @Delete(':id')
    async delete(@Param() { id }: { id: number }) {
        return await this.productsService.deleteProduct(id)
        .catch((e) => {
            throw new HttpException({
                message: e.message
            }, HttpStatus.BAD_REQUEST);
        });
    }
}
