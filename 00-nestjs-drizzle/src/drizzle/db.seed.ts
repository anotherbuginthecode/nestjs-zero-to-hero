/**
 * Seeds the database with sample product data.
 * 
 * This function creates a connection to the database using the connection string
 * specified in the environment variable `DATABASE_URL`. It then generates an array
 * of 20 sample product objects using the `faker` library and inserts them into the
 * `products` table in the database.
 * 
 * The product objects contain the following fields:
 * - `name`: A randomly generated product name.
 * - `price`: A randomly generated product price, parsed as a float.
 * - `quantity`: A randomly generated integer between 10 and 100.
 * - `description`: A randomly generated product description.
 * 
 * The function logs messages to the console indicating the start and completion of the seeding process.
 * 
 * @async
 * @function main
 * @returns {Promise<void>} A promise that resolves when the seeding process is complete.
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg";
import { products } from "./schemas/products/products.entity";
import { faker } from "@faker-js/faker";
import { dirname, join } from 'path';
import * as dotenv from "dotenv";

const envPath = join(dirname(__dirname),"../.env");
console.log(envPath);
dotenv.config({path: envPath});

if (!("DATABASE_URL" in process.env))
	throw new Error("DATABASE_URL not found on .env");

const main = async () => {
	const client = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
	const db = drizzle(client);
	const data: (typeof products.$inferInsert)[] = [];

	for (let i = 0; i < 20; i++) {
        data.push({
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            quantity: faker.number.int({ min: 10, max: 100 }),
            description: faker.commerce.productDescription(),
        });
	}

	console.log("Seed start");
	await db.insert(products).values(data);
	console.log("Seed done");
};

main();