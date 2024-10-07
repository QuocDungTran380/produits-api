import express, { NextFunction, Request, Response } from 'express';
import { productsRoute } from './routes/product.route';
import { userRoute } from './routes/user.route';
import { loadCertificate } from './middlewares/certificat.middleware';
import https from 'https';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

let certificatOptions = loadCertificate();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'An API to manage products and users',
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

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;