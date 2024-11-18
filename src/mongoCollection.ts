import mongoose from "mongoose";

export const getProductsCollection: () => Promise<mongoose.Collection<mongoose.AnyObject>> = async () => {
    return await mongoose?.connection?.collection("products")
}