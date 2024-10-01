import express, { Request, Response } from 'express';

const app = express();

// Middleware de parsing du JSON
app.use(express.json());

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

const productsRoute = require("./routes/product.route");
app.use("/products", productsRoute);

export default app;