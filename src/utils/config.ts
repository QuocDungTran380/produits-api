import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "f49b9887eaf6064cc86938c5093c01a7b938eb3903d91df24cd6ab643184f2de",
};