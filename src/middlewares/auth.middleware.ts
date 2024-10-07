import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/jwt.utils";
import {errorLogger, warnLogger } from './logger.middleware';

// Middleware pour vérifier le JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    warnLogger.warn('Access refused');
    return res.status(401).json({ message: 'Access refused' });
  }

  try {
    const token = authHeaders.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.body.user = decoded;
    next();
  } catch (error) {
    warnLogger.warn('Access refused');
    res.status(401).json({ message: 'Access refused' });
  }
};
