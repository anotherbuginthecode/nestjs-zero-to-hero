export interface Product {
    id: number;
    name: string;
    price: number;
    description: string | null;
    quantity: number;
    in_stock: boolean;
}