import dotenv from 'dotenv';
import * as mongoose from 'mongodb';

dotenv.config();

export const config = {
  PORT: process.env?.PORT || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  ENV: process.env.ENV || "",
  DB_URI: process.env.DB_URI || "",
};

// export const productsCollection: { products?: mongoose.Collection } = {};