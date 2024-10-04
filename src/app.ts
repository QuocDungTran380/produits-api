import express, { Request, Response } from 'express';
import { productsRoute } from './routes/product.route';
import { userRoute } from './routes/user.route';
import { loadCertificate } from './middlewares/certificat.middleware';
import https from 'https';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

let certificatOptions = loadCertificate();

// Middleware de parsing du JSON
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple API to manage users',
    },
  },
  apis: ['./src/routes/*.route.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express! Connexion sécurisé');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/products", productsRoute);

app.use("/users", userRoute);

app.use(errorMiddleware);

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;