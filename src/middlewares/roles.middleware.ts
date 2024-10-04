import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(roles: string[]): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.user.accountType;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Accès interdit.' });
    }
    next();
  };
}