import { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";

const express = require('express');
const router = express.Router();

const productsController = new ProductController();

// GET - Récupérer tous les livres
router.get("/", (req: Request, res: Response) => {
    if (req.query.minPrice && req.query.maxPrice) {
        productsController.filterProductByPrice(req, res);
    } else if (req.query.minStock && req.query.minStock) {
        productsController.filterProductByStock(req, res);
    } else {
        productsController.getAllProducts(req, res);
    }
});

router.post("/", productsController.addProduct);

module.exports = router;