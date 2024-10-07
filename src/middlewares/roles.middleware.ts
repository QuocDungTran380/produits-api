import { Request, Response, NextFunction } from 'express';
import {errorLogger, warnLogger } from './logger.middleware';

export function roleMiddleware(roles: string[]): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.user.accountType;
    if (!roles.includes(userRole)) {
      warnLogger.warn(`Action non-authorized from ${req.body.user.email}`);
      return res.status(403).json({ message: 'Action non-authorized' });
    }
    next();
  };
}