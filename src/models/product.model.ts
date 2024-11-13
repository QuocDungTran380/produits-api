import { Product } from "../interfaces/product.interface";

export class ProductModel implements Product {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public category: string,
        public quantity: number,
        public price: number
    ) {}
};