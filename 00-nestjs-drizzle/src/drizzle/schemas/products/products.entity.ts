import { integer, serial, pgTable, text, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


/**
 * Represents the 'products' table in the database.
 * 
 * @table products
 * 
 * @property {number} id - The primary key for the product, auto-incremented.
 * @property {string} name - The unique name of the product, cannot be null.
 * @property {string} [description] - The description of the product, optional.
 * @property {number} price - The price of the product, cannot be null.
 * @property {number} quantity - The quantity of the product in stock, defaults to 0, cannot be null.
 * @property {boolean} in_stock - Indicates if the product is in stock, defaults to true, cannot be null.
 */
export const products = pgTable('products', {
    id: serial().primaryKey(),
    name: text('name').unique().notNull(),
    description: text('description'),
    price: doublePrecision('price').notNull(),
    quantity: integer('quantity').notNull().default(0),
    in_stock: boolean('in_stock').notNull().default(true),
    created_at: timestamp('created_at').defaultNow().notNull()
});

export type ProductEntity = InferSelectModel<typeof products>;
export type ProductEntityInsert = InferInsertModel<typeof products>;