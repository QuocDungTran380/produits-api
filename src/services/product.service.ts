import { Product } from "../interfaces/product.interface";
import fs from "fs";

export class ProductService {
    public static async getAllProducts(): Promise<Product[]> {
        const data = fs.readFileSync("products.json", "utf-8");
        const productsList: Product[] = JSON.parse(data);
        return productsList;
    }

    public static async getProductsByPrice(minPrice: number, maxPrice: number): Promise<Product[]> {
        const data = fs.readFileSync("products.json", "utf-8");
        const productsList: Product[] = JSON.parse(data);
        const filteredProducts = productsList.filter(function (i, n) {
            return i.price >= minPrice && i.price <= maxPrice;
        })
        return filteredProducts;
    }

    public static async getProductsByStock(minStock: number, maxStock: number): Promise<Product[]> {
        const data = fs.readFileSync("products.json", "utf-8");
        const productsList: Product[] = JSON.parse(data);
        const filteredProducts = productsList.filter(function (i, n) {
            return i.quantity >= minStock && i.quantity <= maxStock;
        })
        return filteredProducts;
    }

    public static async addProduct(name: string, description: string, category: string, quantity: number, price: number): Promise<number> {;
        const data = fs.readFileSync("products.json", "utf-8");
        const productsList: Product[] = JSON.parse(data);
        const nameRegex = /^[a-zA-Z]{3,50}$/;
        const priceRegex = /^\d+(.\d{1,2})?$/;
        const quantityRegex = /^\d+$/;
        if (nameRegex.test(name) && priceRegex.test(price.toString()) && quantityRegex.test(quantity.toString())) {
            const newProduct: Product = {
                id: Math.floor(Math.random() * 1000),
                name: name,
                description: description,
                category: category,
                quantity: quantity,
                price: price
            }
            productsList.push(newProduct);
            const productsToWrite = JSON.stringify(productsList, null, 4);
            fs.writeFileSync("products.json", productsToWrite);
            return 1;
        } else {
            return 0;
        }
    }
}