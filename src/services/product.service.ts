import fs from "fs";
// import { Product } from "../models/productSchema.model";
// import { Collection } from "mongoose";
// import { collections } from "../utils/config";

import mongoose, { Mongoose } from "mongoose";
import { getProductsCollection } from "../mongoCollection";
import { Product } from "../models/productSchema.model";
import { ProductModel } from "../models/product.model";

export class ProductService {

    // private static getDataFromJson(): Produit[] {
    //     const data = fs.readFileSync("./database/products.json", "utf-8");
    //     return JSON.parse(data);
    // }

    // private static async getDataFromMango(): Promise<Array<Produit>> {
    //     let productsList: any = [];
    //     const collection = await getProductsCollection();
    //     collection.find().map((p: any) => {
    //         p = new Product({
    //             id: p.id,
    //             title: p.title,
    //             description: p.description,
    //             category: p.category,
    //             quantity: p.quantity,
    //             price: p.price
    //         });
    //         productsList.push(p);
    //     });
    //     return productsList;
    // }
    private static async getData(version: string): Promise<Array<ProductModel>> {
        let productsList: any = [];
        if (version === 'v1') {
            const data = fs.readFileSync("./database/products.json", "utf-8");
            productsList = JSON.parse(data);
            console.log('fetched from v1')
        } else if (version === 'v2') {
            productsList = (await (await getProductsCollection()).find().toArray()).map((product) => {
            return new ProductModel({
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                price: product.price
            })
            });
            console.log('fetched from v2')
        }
        return productsList;
    }

    private static async writeData(version: string, productsList: ProductModel[]): Promise<void> {
        if (version === 'v1') {
            const productsToWrite = JSON.stringify(productsList, null, 4);
            fs.writeFileSync("./database/products.json", productsToWrite);
        } else if (version === 'v2') {
            const collection = await getProductsCollection();
            await collection.deleteMany({});
            await collection.insertMany(productsList);
        }
    }

    public static async filterProducts(version: string, minPrice?: number, maxPrice?: number, minStock?: number, maxStock?: number): Promise<any> {
        let productsList = await this.getData(version);
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
                } 
                
                else if (minPrice) {
                    if (priceRegex.test(minPrice.toString())) {
                        productsList = productsList.filter(function (i, n) {
                            return i.price >= minPrice;
                        })
                    } else return null;
                } 
                
                else if (maxPrice) {
                    if (priceRegex.test(maxPrice.toString())) {
                        productsList = productsList.filter(function (i, n) {
                            return i.price <= maxPrice;
                        })
                    }
                } 
                
                else return null;
            } 
            
            if (minStock || maxStock) {
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
            return productsList;
        } else {
            return null;
        }
    }

    public static async addProduct(version: string, title: string, description: string, category: string, quantity: number, price: number): Promise<number> {
        const productsList = await this.getData(version);
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
                productsList.push(newProduct);
                this.writeData(version, productsList);
                return 1;
            } else return 0;
        } else return 0;
    }
    public static async modifyProduct(version: string, id: number, title?: string, description?: string, quantity?: number, price?: number): Promise<number> {
        const productsList = await this.getData(version);
        let changeSuccess = false;
        productsList.find(p => {
            if (p.id === id) {
                p.title = title || p.title;
                p.description = description || p.description;
                p.quantity = quantity || p.quantity;
                p.price = price || p.price;
                this.writeData(version, productsList);
                changeSuccess = true;
            }
        });
        return changeSuccess ? 1 : 0;
    }

    public static async deleteProduct(version: string, id: number): Promise<number> {
        const productsList = await this.getData(version);
        const quantityRegex = /^\d+$/;
        let deleteSuccess = false;
        if (quantityRegex.test(id.toString())) {
            for (let i = 0; i < productsList.length; i++) {
                if (productsList.at(i)?.id === id) {
                    productsList.splice(i, 1);;
                    this.writeData(version, productsList);
                    deleteSuccess = true;
                    break;
                }
            }
        }
        return deleteSuccess ? 1 : 0;
    }
}