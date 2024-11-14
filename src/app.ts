import express, { Request, Response } from 'express';
import https from 'https';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { loadCertificate } from './middlewares/certificat.middleware';
import { productsRoute } from './routes/product.route';
import { userRoute } from './routes/user.route';

const app = express();

let certificatOptions = loadCertificate();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'An API to manage products. To use this API, you need to register or login and enter the token in the authorization header.',
    },
  },
  apis: ['./src/routes/*.route.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Route de base
app.get('/v1/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express! Connexion sécurisé');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/v1/products", productsRoute);
app.use("/v2/products", productsRoute);

app.use("/v1/users", userRoute);

const httpApp = https.createServer(certificatOptions, app);

export default httpApp;