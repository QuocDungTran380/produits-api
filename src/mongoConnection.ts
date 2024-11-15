import * as mongoose from 'mongoose';
import { config } from './utils/config';

export async function ConnectToMongoDB() {
    try {
        const uri = "mongodb+srv://420-514_A24:Str0ng_P%40ssw0rd_420-514@quoc-cluster.u2t9z.mongodb.net/?retryWrites=true&w=majority&appName=quoc-cluster";
        if (uri) {
            await mongoose.connect(uri, {
                dbName: "products-api",
            });
        }
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        throw error;
    }
}