import { Product } from "../interfaces/product.interface";
import { ProductModel } from "../models/product.model";

export class ProductService {
    public static async getAllProducts(): Promise<Product[]> {
        return [new ProductModel(1, "Pomme", "Pomme gala", "fruit", 3, 0.99)];
    }
}