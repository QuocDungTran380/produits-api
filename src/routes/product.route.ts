import express, { Router } from "express";
import { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";

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

productsRoute.post("/", productsController.addProduct);
productsRoute.put("/:id", productsController.modifyProduct);
productsRoute.delete("/:id", productsController.deleteProduct);

export {productsRoute};