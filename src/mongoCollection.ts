import mongoose from "mongoose";
import { ProductModel } from "./models/product.model";

export const getProductsCollection: () => Promise<ProductModel[]> = async () => {
    const collection = await mongoose?.connection?.collection("products").find().toArray();
    return collection.map((product) => {
        return new ProductModel({
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            price: product.price
        })
    })
}