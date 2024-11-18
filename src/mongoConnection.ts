import * as mongoose from 'mongoose';
import { config } from './utils/config';

export async function ConnectToMongoDB(): Promise<void> {
    try {
        const uri = "mongodb+srv://420-514_A24:Str0ng_P%40ssw0rd_420-514@quoc-cluster.u2t9z.mongodb.net/?retryWrites=true&w=majority&appName=quoc-cluster";
        let databaseName;
        if (config.ENV === "DEV") databaseName = "products-api-dev";
        else if (config.ENV === "PROD") databaseName = "products-api-prod";
        if (uri && databaseName) {
            await mongoose.connect(uri, {
                dbName: databaseName,
            });
        }
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        throw error;
    }
}