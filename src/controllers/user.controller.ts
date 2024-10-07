import { Request, Response } from "express";
import { UserService } from "../services/auth.service";
import {errorLogger, infoLogger, warnLogger } from "../middlewares/logger.middleware";

export class UserController {
    public async registerUser(req: Request, res: Response) {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            await UserService.registerUser(email, password).then((result) => {
                if (result == 1) {
                    infoLogger.info(`User with email ${email} registered successfully`);
                    res.status(201).json({message: "User registered successfully"});
                } else {
                    errorLogger.error("Error registering user");
                    res.status(400).json({error: "Email invalid/already exists"});
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
                    infoLogger.info(`User with email ${email} logged in successfully`);
                    res.setHeader('authorization', `Bearer ${result}`);
                    res.status(200).json({token: result});
                } else {
                    errorLogger.error("Attempt: email or password invalid");
                    res.status(401).json({error: "Email or password invalid"})
                }
            })
        }
    }

    public async getAdminData(req: Request, res: Response) {
        infoLogger.info("Admin data accessed");
        res.json({ message: 'Données réservées aux administrateurs.' });
    }

}