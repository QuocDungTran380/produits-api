import mongoose from "mongoose"

export const getProductsCollection: () => mongoose.Collection = () => {
    return mongoose?.connection?.collection("products");
}