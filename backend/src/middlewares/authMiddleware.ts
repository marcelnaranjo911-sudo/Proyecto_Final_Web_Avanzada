import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

const secret = process.env.JWT_SECRET || 'secret-token';

type TokenPayload = {
  userId: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR';
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Autenticación requerida', 401);
  }

  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, secret) as TokenPayload;
    req.user = payload;
    next();
  } catch (error) {
    throw new AppError('Token inválido', 401);
  }
}
