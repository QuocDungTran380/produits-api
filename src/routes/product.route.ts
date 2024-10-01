import { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";

const express = require('express');
const router = express.Router();

const productsController = new ProductController();

// GET - Récupérer tous les livres
router.get("/", productsController.getAllProducts);

module.exports = router;