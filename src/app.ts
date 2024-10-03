import express, { Request, Response } from 'express';
import { productsRoute } from './routes/product.route';
import { userRoute } from './routes/user.route';

const app = express();

// Middleware de parsing du JSON
app.use(express.json());

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/products", productsRoute);

app.use("/users", userRoute);

export default app;