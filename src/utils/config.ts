import dotenv from 'dotenv';
import * as mongoose from 'mongodb';

dotenv.config();

export const config = {
  port: process.env?.PORT || "",
  JWT_SECRET: process.env.JWT_SECRET || ""
};

export const productsCollection: { products?: mongoose.Collection } = {};