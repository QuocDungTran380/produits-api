import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET || "",
  ENV: process.env.ENV
};
