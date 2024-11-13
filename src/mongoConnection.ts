import * as mongoDb from 'mongodb';
import * as mongoose from 'mongoose';
import { productsCollection } from './utils/config';

export async function ConnectToMongoDB() {
    const uri = "mongodb+srv://420-514_A24:Str0ng_P%40ssw0rd_420-514@quoc-cluster.u2t9z.mongodb.net/?retryWrites=true&w=majority&appName=quoc-cluster";
    try {
        await mongoose.connect(uri, {
            dbName: "products-api",
        })
        mongoose.connection;
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        throw error;
    }
}