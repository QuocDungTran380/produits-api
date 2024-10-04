import { Request, Response } from "express";
import { UserService } from "../services/auth.service";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../utils/jwt.utils";

export class UserController {
    public async registerUser(req: Request, res: Response) {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            await UserService.registerUser(email, password).then((result) => {
                if (result == 1) {
                    res.status(201).json({message: "Utilisateur ajouté"})
                } else {
                    res.status(400).json({message: "Email invalide"})
                }
            })
        }
    }

    public async loginUser(req: Request, res: Response) {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            await UserService.loginUser(email, password).then((result) => {
                if (result) {
                    res.setHeader('authorization', result);
                    res.status(200).json({message: "Access token: " + result});
                } else {
                    res.status(401).json({message: "Email ou mot de passe non valide"})
                }
            })
        }
    }

    public async getAdminData(req: Request, res: Response) {
        res.json({ message: 'Données réservées aux administrateurs.' });
    }

}