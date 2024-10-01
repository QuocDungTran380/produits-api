import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    public async getProducts(req: Request, res: Response): Promise<void> {
        console.log(req.query);
        var productsList;
        if (req.query.minPrice && req.query.maxPrice) {
            const minPrice = parseFloat(req.query.minPrice as string);
            const maxPrice = parseFloat(req.query.maxPrice as string);
            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                productsList = await ProductService.getProductsByPrice(minPrice, maxPrice);
                res.status(200).json(productsList);
            } else {
                res.status(400).json({ message: "Requête invalide" });
            }
        } else if (req.query.minStock && req.query.maxStock) {
            const minStock = parseInt(req.query.minStock as string);
            const maxStock = parseInt(req.query.maxStock as string);
            if (!isNaN(minStock) && !isNaN(maxStock)) {
                productsList = await ProductService.getProductsByStock(minStock, maxStock);
                res.status(200).json(productsList);
            } else {
                res.status(400).json({ message: "Requête invalide" });
            }
        } else {
            productsList = await ProductService.getAllProducts();
            res.status(200).json(productsList);
        }
    }

    public async addProduct(req: Request, res: Response): Promise<void> {
        if (req.body.name, req.body.description, req.body.category, req.body.quantity, req.body.price) {
            const name = req.body.name as string;
            const description = req.body.description as string;
            const category = req.body.category as string;
            const quantity = req.body.quantity as number;
            const price = req.body.price as number;
            if (name && description && category && quantity && price) {
                await ProductService.addProduct(name, description, category, quantity, price).then((result) => {
                    if (result == 1) {
                        res.status(201).json({ message: "Produit ajouté" });
                    } else {
                        res.status(400).json({ message: "Requête invalide" });
                    }
                });
            }
        }
    }
}