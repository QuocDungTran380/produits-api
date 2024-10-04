import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/jwt.utils";

// Middleware pour vérifier le JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        req.body.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
      }
};
