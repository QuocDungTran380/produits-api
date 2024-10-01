import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        const productsList = await ProductService.getAllProducts();
        res.json(productsList);
    }
}