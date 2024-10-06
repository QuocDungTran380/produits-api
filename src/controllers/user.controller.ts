import { Request, Response } from "express";
import { UserService } from "../services/auth.service";
import logger from "../middlewares/error.middleware";

export class UserController {
    public async registerUser(req: Request, res: Response) {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            await UserService.registerUser(email, password).then((result) => {
                if (result == 1) {
                    logger.info(`User with email ${email} registered successfully`);
                    res.status(201).json({message: "User registered successfully"});
                } else {
                    res.status(400).json({error: "Email invalid"})
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
                    logger.info(`User with email ${email} logged in successfully`);
                    res.setHeader('authorization', `Bearer ${result}`);
                    res.status(200).json({token: result});
                } else {
                    logger.error("Email or password invalid");
                    res.status(401).json({error: "Email or password invalid"})
                }
            })
        }
    }

    public async getAdminData(req: Request, res: Response) {
        res.json({ message: 'Données réservées aux administrateurs.' });
    }

}