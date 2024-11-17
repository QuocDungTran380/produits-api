import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import { config } from '../utils/config';
import { errorLogger } from './logger.middleware';

// Middleware pour vérifier le JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    errorLogger.error('Access refused');
    return res.status(401).json({ message: 'Access refused' });
  }

  try {
    const token = authHeaders.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
    req.body.user = decoded;
    next();
  } catch (error) {
    errorLogger.error('Access refused');
    res.status(401).json({ message: 'Access refused' });
  }
};
