import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import {errorLogger, infoLogger, warnLogger } from "../middlewares/logger.middleware";

export class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        var productsList;
        productsList = await ProductService.getAllProducts();
        res.status(200).json(productsList);
    }

    public async filterProductByPrice(req: Request, res: Response): Promise<void> {
        var productsList;
        const priceRegex = /^\d+(.\d{1,2})?$/;
        if (priceRegex.test(req.query.minPrice as string) && priceRegex.test(req.query.maxPrice as string)) {
            const minPrice = parseFloat(req.query.minPrice as string);
            const maxPrice = parseFloat(req.query.maxPrice as string);
            if (maxPrice > minPrice) {
                productsList = await ProductService.getProductsByPrice(minPrice, maxPrice);
                res.status(200).json(productsList);
            } else {
                res.status(400).json({ error: "Invalid request" });
            }
        } else {
            res.status(400).json({ error: "Invalid request" });
        }
    }

    public async filterProductByStock(req: Request, res: Response): Promise<void> {
        var productsList;
        const quantityRegex = /^\d+$/;
        if (quantityRegex.test(req.query.minStock as string) && quantityRegex.test(req.query.maxStock as string)) {
            const minStock = parseInt(req.query.minStock as string);
            const maxStock = parseInt(req.query.maxStock as string);
            productsList = await ProductService.getProductsByStock(minStock, maxStock);
            res.status(200).json(productsList);
        } else {
            errorLogger.error("Invalid request");
            res.status(400).json({ error: "Invalid request" });
        }
    }

    public async addProduct(req: Request, res: Response): Promise<void> {
        if (req.body.title, req.body.description, req.body.category, req.body.quantity, req.body.price) {
            const title = req.body.title
            const description = req.body.description;
            const category = req.body.category;
            const quantity = Number(req.body.quantity);
            const price = Number(req.body.price);
            try {
                await ProductService.addProduct(title, description, category, quantity, price).then((result) => {
                    if (result == 1) {
                        infoLogger.info("New product added");
                        res.status(201).json({ message: "Product added successfully" });
                    } else {
                        errorLogger.error("Error adding product");
                        res.status(400).json({ error: "Invalid request" });
                    }
                });
            } catch {
                errorLogger.error("Error adding product");
                res.status(400).json({ error: "Invalid request" });
            }
        }
    }
    public async modifyProduct(req: Request, res: Response): Promise<void> {
        if (req.params.id && (req.body.title || req.body.description || req.body.quantity || req.body.price)) {
            const titleRegex = /^[a-zA-Z]{3,50}$/;
            const descriptionRegex = /^[a-zA-Z]{3,100}$/;
            const priceRegex = /^\d+(.\d{1,2})?$/;
            const quantityRegex = /^\d+$/;

            const id = Number(req.params.id);
            const title = req.body?.title;
            const description = req.body?.description;
            const quantity = Number(req.body?.quantity);
            const price = Number(req.body?.price);

            if (quantityRegex.test(id.toString()) && titleRegex.test(title) && descriptionRegex.test(description) && quantityRegex.test(quantity.toString()) && priceRegex.test(price.toString())) {
                await ProductService.modifyProduct(id, title, description, quantity, price).then((result) => {
                    if (result == 1) {
                        infoLogger.info(`Product ${id} changed`);
                        res.status(200).json({ message: "Product changed successfully" });
                    } else if (result == 0) {
                        res.status(404).json({ error: "Product not found" });
                    } else {
                        errorLogger.error("Error changing product");
                        res.status(400).json({ error: "Invalid request" });
                    }
                })
            } else {
                errorLogger.error("Error changing product");
                res.status(400).json({ message: "Invalid request" });
            }
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        if (req.params.id) {
            const id = Number(req.params.id);
            if (!isNaN(id)) {
                await ProductService.deleteProduct(id).then((result) => {
                    if (result == 1) {
                        infoLogger.info(`Product ${id} deleted`);
                        res.status(204).json({ message: "Product deleted successfully" });
                    } else if (result == 0) {
                        res.status(404).json({ error: "Product not found" });
                    }
                });
            } else {
                errorLogger.error("Error deleting product");
                res.status(400).json({ error: "Invalid request" });
            }
        }
    }
}