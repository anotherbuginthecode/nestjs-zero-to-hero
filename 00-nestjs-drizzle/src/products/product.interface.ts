export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    in_stock: boolean;

    addProduct(product: Product): Product;
    getAllProducts(): Product[];
    getProduct(id: number): Product;
    updateProduct(id: number, product: Product): Product;
    deleteProduct(id: number): Product;
}