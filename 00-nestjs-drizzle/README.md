# NestJS Drizzle Example

This project is an example of using NestJS with Drizzle ORM. It demonstrates how to set up a basic NestJS application with Drizzle ORM for database interactions.

## Purpose

The purpose of this project is to learn how to use Drizzle ORM with NestJS. 
It is part of a series of NestJS projects aimed at completing my zero-to-hero roadmap. 
It includes basic CRUD operations and demonstrates how to structure a NestJS project.

## Main Endpoints

### Products

- `GET /products` - Retrieve a list of all products.
- `GET /products/:id` - Retrieve a specific product by ID.
- `POST /products` - Create a new product.
- `PUT /products/:id` - Update an existing product by ID.
- `DELETE /products/:id` - Delete a product by ID.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- PostgreSQL (or any other supported database)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/anotherbuginthecode/nestjs-zero-to-hero.git
    cd 00-nestjs-drizzle
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure the database connection:
    - Create a `.env` file in the root directory and add your database configuration:
        ```env
        DATABASE_URL=postgres://username:password@localhost:5432/database
        ```

4. Run database migrations:
    ```bash
    npm run drizzle:migrate
    # or
    yarn drizzle:migrate
    ```

5. (Optional) Seed the database with fake data
    ```bash
    npm run drizzle:seed
    # or
    yarn drizzle:seed
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```

2. The application will be running at `http://localhost:3000`.

### Testing

1. Run unit tests:
    ```bash
    npm run test
    # or
    yarn test
    ```

2. Run end-to-end tests:
    ```bash
    npm run test:e2e
    # or
    yarn test:e2e
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.