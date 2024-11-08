import { createZodDto } from "nestjs-zod";
import { ProductEntityInsertSchema } from "../../drizzle/schemas/products/products.entity";


export class CreateProductSchema extends createZodDto(ProductEntityInsertSchema) {}
