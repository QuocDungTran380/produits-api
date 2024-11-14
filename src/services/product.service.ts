import fs from "fs";
// import { Product } from "../models/productSchema.model";
// import { Collection } from "mongoose";
// import { collections } from "../utils/config";

import mongoose from "mongoose";
import { getProductsCollection } from "../mongoCollection";
import { Product } from "../models/productSchema.model";
import { Produit } from "../interfaces/product.interface";

export class ProductService {

    private static getDataFromJson(): Produit[] {
        const data = fs.readFileSync("./database/products.json", "utf-8");
        return JSON.parse(data);
    }

    private static async getDataFromMango(): Promise<Array<Produit>> {
        let productsList: any = [];
        const collection = await getProductsCollection();
        collection.find().map((p: any) => {
            p = new Product({
                id: p.id,
                title: p.title,
                description: p.description,
                category: p.category,
                quantity: p.quantity,
                price: p.price
            });
            productsList.push(p);
        });
        return productsList;
    }

    private static writeData(productsList: Produit[]): void {
        const productsToWrite = JSON.stringify(productsList, null, 4);
        fs.writeFileSync("./database/products.json", productsToWrite);
    }

    public static async filterProducts(version: string, minPrice?: number, maxPrice?: number, minStock?: number, maxStock?: number): Promise<any> {
        let productsList;
        if (version === '1') {
            productsList = this.getDataFromJson();
        } else if (version === '2') {
            productsList = await this.getDataFromMango();
        }
        if (productsList) {
            const priceRegex = /^\d+(.\d{1,2})?$/;
            const quantityRegex = /^\d+$/;
            if (minPrice || maxPrice) {
                if (minPrice && maxPrice) {
                    if (priceRegex.test(minPrice.toString()) && priceRegex.test(maxPrice.toString())) {
                        if (maxPrice > minPrice) {
                            productsList = productsList.filter(function (i, n) {
                                return i.price >= minPrice && i.price <= maxPrice;
                            })
                        } else return null;
                    } else return null;
                } else if (minPrice) {
                    if (priceRegex.test(minPrice.toString())) {
                        productsList = productsList.filter(function (i, n) {
                            return i.price >= minPrice;
                        })
                    } else return null;
                } else if (maxPrice) {
                    console.log('test');
                    if (priceRegex.test(maxPrice.toString())) {
                        productsList = productsList.filter(function (i, n) {
                            return i.price <= maxPrice;
                        })
                    }
                } else return null;
            } if (minStock || maxStock) {
                if (minStock && maxStock) {
                    if (quantityRegex.test(minStock.toString()) && quantityRegex.test(maxStock.toString())) {
                        if (maxStock > minStock) {
                            productsList = productsList.filter(function (i, n) {
                                return i.quantity >= minStock && i.quantity <= maxStock;
                            })
                        } else return null;
                    } else return null;
                } else if (minStock) {
                    if (quantityRegex.test(minStock.toString())) {
                        productsList = productsList.filter(function (i, n) {
                            return i.quantity >= minStock;
                        })
                    } else return null;
                } else if (maxStock) {
                    if (quantityRegex.test(maxStock.toString())) {
                        productsList = productsList.filter(function (i, n) {
                            return i.quantity <= maxStock;
                        })
                    } else return null;
                }
                return productsList;
            }
        } else {
            return null;
        }
    }

    public static async addProduct(version: string, title: string, description: string, category: string, quantity: number, price: number): Promise<number> {
        let productsList;
        if (version === '1') {
            productsList = this.getDataFromJson();
        } else if (version === '2') {
            productsList = await this.getDataFromMango();
        }
        if (productsList) {
            const titleRegex = /^[a-zA-Z]{3,50}$/;
            const priceRegex = /^\d+(.\d{1,2})?$/;
            const quantityRegex = /^\d+$/;
            if (titleRegex.test(title) && priceRegex.test(price.toString()) && quantityRegex.test(quantity.toString())) {
                const newProduct = new Product({
                    id: Math.floor(Math.random() * 1000),
                    title,
                    description,
                    category,
                    quantity,
                    price
                })
                if (version === '1') {
                    productsList.push(newProduct);
                    this.writeData(productsList);
                    return 1;
                } else if (version === '2') {
                    newProduct.save();
                    return 1;
                }
            } else return 0;
        } else return 0;
        return 0;
    }
    //     public static async modifyProduct(id: number, title?: string, description?: string, quantity?: number, price?: number): Promise<number> {
    //         const productsList = this.getData();
    //         let changeSuccess = false;
    //         productsList.find(p => {
    //             if (p.id === id) {
    //                 p.title = title || p.title;
    //                 p.description = description || p.description;
    //                 p.quantity = quantity || p.quantity;
    //                 p.price = price || p.price;
    //                 this.writeData(productsList);
    //                 changeSuccess = true;
    //             }
    //         });
    //         return changeSuccess ? 1 : 0;
    //     }

    //     public static async deleteProduct(id: number): Promise<number> {
    //         const productsList = this.getData();
    //         const quantityRegex = /^\d+$/;
    //         let deleteSuccess = false;
    //         if (quantityRegex.test(id.toString())) {
    //             for (let i = 0; i < productsList.length; i++) {
    //                 if (productsList.at(i)?.id === id) {
    //                     productsList.splice(i, 1);;
    //                     this.writeData(productsList);
    //                     deleteSuccess = true;
    //                     break;
    //                 }
    //             }
    //         }
    //         return deleteSuccess ? 1 : 0;
    //     }
}