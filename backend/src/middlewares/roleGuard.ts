import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

export function roleGuard(roles: Array<'ADMIN' | 'OPERATOR'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { role: 'ADMIN' | 'OPERATOR' } | undefined;
    if (!user || !roles.includes(user.role)) {
      throw new AppError('Acceso denegado', 403);
    }
    next();
  };
}
