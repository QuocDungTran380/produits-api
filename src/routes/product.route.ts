import express, { Router } from "express";
import { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Allow users to view all products.
 *     description: Allow users to view all products. If the user is an admin, they can add, modify or delete a product.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                     type: integer
 *                     example: 1
 *                  title:
 *                     type: string
 *                     example: pommes
 *                  description:
 *                     type: string
 *                     example: gala
 *                  category:
 *                     type: string
 *                     example: fruits
 *                  quantity:
 *                     type: integer
 *                     example: 23
 *                  price:
 *                     type: float
 *                     example: 2.50
 */

const productsRoute = Router();

const productsController = new ProductController();

// GET - Récupérer tous les livres
productsRoute.get("/", (req: Request, res: Response) => {
    if (req.query.minPrice && req.query.maxPrice) {
        productsController.filterProductByPrice(req, res);
    } else if (req.query.minStock && req.query.minStock) {
        productsController.filterProductByStock(req, res);
    } else {
        productsController.getAllProducts(req, res);
    }
});

productsRoute.post("/", verifyToken, roleMiddleware(["admin"]), productsController.addProduct);
productsRoute.put("/:id", verifyToken, roleMiddleware(["admin"]), productsController.modifyProduct);
productsRoute.delete("/:id", verifyToken, roleMiddleware(["admin"]), productsController.deleteProduct);

export {productsRoute};