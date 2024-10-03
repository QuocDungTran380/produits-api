import { Product } from "../interfaces/product.interface";
import fs from "fs";

export class ProductService {

    private static getData(): Product[] {
        const data = fs.readFileSync("products.json", "utf-8");
        return JSON.parse(data);
    }

    private static writeData(productsList: Product[]): void {
        const productsToWrite = JSON.stringify(productsList, null, 4);
        fs.writeFileSync("products.json", productsToWrite);
    }

    public static async getAllProducts(): Promise<Product[]> {
        return this.getData();
    }

    public static async getProductsByPrice(minPrice: number, maxPrice: number): Promise<Product[]> {
        const productsList = this.getData();
        const filteredProducts = productsList.filter(function (i, n) {
            return i.price >= minPrice && i.price <= maxPrice;
        })
        return filteredProducts;
    }

    public static async getProductsByStock(minStock: number, maxStock: number): Promise<Product[]> {
        const productsList = this.getData();
        const filteredProducts = productsList.filter(function (i, n) {
            return i.quantity >= minStock && i.quantity <= maxStock;
        })
        return filteredProducts;
    }

    public static async addProduct(title: string, description: string, category: string, quantity: number, price: number): Promise<number> {
        ;
        const productsList = this.getData();
        const titleRegex = /^[a-zA-Z]{3,50}$/;
        const priceRegex = /^\d+(.\d{1,2})?$/;
        const quantityRegex = /^\d+$/;
        if (titleRegex.test(title) && priceRegex.test(price.toString()) && quantityRegex.test(quantity.toString())) {
            const newProduct: Product = {
                id: Math.floor(Math.random() * 1000),
                title,
                description,
                category,
                quantity,
                price
            }
            productsList.push(newProduct);
            this.writeData(productsList);
            return 1;
        } else {
            return 0;
        }
    }
    public static async modifyProduct(id: number, title?: string, description?: string, quantity?: number, price?: number): Promise<number> {
        const productsList = this.getData();
        let changeSuccess = false;
        productsList.find(p => {
            if (p.id === id) {
                p.title = title || p.title;
                p.description = description || p.description;
                p.quantity = quantity || p.quantity;
                p.price = price || p.price;
                this.writeData(productsList);
                changeSuccess = true;
            }
        });
        return changeSuccess ? 1 : 0;
    }

    public static async deleteProduct(id: number): Promise<number> {
        const productsList = this.getData();
        const quantityRegex = /^\d+$/;
        let deleteSuccess = false;
        if (quantityRegex.test(id.toString())) {;
            for (let i = 0; i < productsList.length; i++) {
                if (productsList.at(i)?.id === id) {
                    productsList.splice(i, 1);;
                    this.writeData(productsList);
                    deleteSuccess = true;
                    break;
                }
            }
        }
        return deleteSuccess ? 1 : 0;
    }
}