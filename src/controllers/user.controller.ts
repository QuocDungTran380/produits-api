import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import jwt from 'jsonwebtoken'

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
                    var payload = jwt.verify(result, "f49b9887eaf6064cc86938c5093c01a7b938eb3903d91df24cd6ab643184f2de") as jwt.JwtPayload;
                    res.status(200).json({message: "Access token: " + result});
                } else {
                    res.status(401).json({message: "Email ou mot de passe non valide"})
                }
            })
        }
    }

}