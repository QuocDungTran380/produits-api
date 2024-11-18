import { ProductInterface } from "../interfaces/product.interface";

class ProductModel implements ProductInterface {
    id: number;
    title: string;
    description: string;
    category: string;
    quantity: number;
    price: number;

    constructor(product: ProductInterface) {
        this.id = product.id;
        this.title = product.title;
        this.description = product.description;
        this.category = product.category;
        this.quantity = product.quantity;
        this.price = product.price;
    }
}

export { ProductModel };