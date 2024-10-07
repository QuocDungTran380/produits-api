import express, { Router } from "express";
import { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";

const productsRoute = Router();

const productsController = new ProductController();

 /**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your access token here
 * security:
 *   - bearerAuth: []
 */
 
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Show all products.
 *     description: Allow users to view all products. If the user is an admin, they can add, modify or delete a product. The user can also filter products by price or stock (CANNOT filter both at once)
 *     tags:
 *      - Products
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price of the product
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price of the product
 *       - in: query
 *         name: minStock
 *         schema:
 *           type: integer
 *         description: Minimum stock of the product
 *       - in: query
 *         name: maxStock
 *         schema:
 *           type: integer
 *         description: Maximum stock of the product
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
 *                     example: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
 *                  description:
 *                     type: string
 *                     example: Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
 *                  category:
 *                     type: string
 *                     example: men's clothing
 *                  quantity:
 *                     type: integer
 *                     example: 23
 *                  price:
 *                     type: float
 *                     example: 109.50
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request
 */

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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product to the database.
 *     tags:
 *      - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: pommes
 *             description:
 *               type: string
 *               example: gala
 *             category:
 *               type: string
 *               example: fruits
 *             quantity:
 *               type: integer
 *               example: 23
 *             price:
 *               type: float
 *               example: 2.50
 * 
 *     responses:
 *       201:
 *         description: Product added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added successfully
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Access refused. Occurs when a user is not logged in (no token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access refused
 *       403:
 *         description: Action non-authorized. Occurs when a employee tries to perform an action only reserved for an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Action non-authorized
 */

productsRoute.post("/", verifyToken, roleMiddleware(["admin"]), productsController.addProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Modify a product
 *     description: Modify a product from the database with an id and new values.
 *     tags:
 *      - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: integer
 *         description: Id of the product to modify
  *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: pommes
 *             description:
 *               type: string
 *               example: gala
 *             quantity:
 *               type: integer
 *               example: 23
 *             price:
 *               type: float
 *               example: 2.50
 *     responses:
 *       200:
 *         description: Product changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product changed successfully
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Access refused. Occurs when a user is not logged in (no token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access refused
 *       403:
 *         description: Action non-authorized. Occurs when a employee tries to perform an action only reserved for an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access non-authorized
 *       404:
 *         description: Product not found. The provided id is not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 */

productsRoute.put("/:id", verifyToken, roleMiddleware(["admin"]), productsController.modifyProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the database with an id
 *     tags:
 *      - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: integer
 *         description: Id of the product to delete
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Access refused. Occurs when a user is not logged in (no token)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access refused
 *       403:
 *         description: Action non-authorized. Occurs when a employee tries to perform an action only reserved for an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access non-authorized
 *       404:
 *         description: Product not found. The provided id is not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 */

productsRoute.delete("/:id", verifyToken, roleMiddleware(["admin"]), productsController.deleteProduct);

export {productsRoute};