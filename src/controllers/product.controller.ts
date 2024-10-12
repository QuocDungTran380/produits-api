import { Request, Response } from "express";
import { errorLogger, infoLogger } from "../middlewares/logger.middleware";
import { ProductService } from "../services/product.service";

export class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        var productsList;
        productsList = await ProductService.getAllProducts();
        res.status(200).json(productsList);
    }

    public async filterProducts(req: Request, res: Response): Promise<void> {
        try {
            const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
            const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
            const minStock = req.query.minStock ? parseFloat(req.query.minStock as string) : undefined;
            const maxStock = req.query.maxStock ? parseFloat(req.query.maxStock as string) : undefined;
            const productsList = await ProductService.filterProducts(minPrice, maxPrice, minStock, maxStock);
            if (productsList == null) {
                errorLogger.error("Invalid request");
                res.status(400).json({ error: "Invalid request" });
            } else if (productsList.length == 0) {
                res.status(404).json({ message: "No products found" });
            } else if (productsList.length > 0) {
                res.status(200).json(productsList);
            }
        } catch {
            errorLogger.error("Error filtering products");
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