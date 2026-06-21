import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';
import { AppError } from '../utils/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-token';

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '8h'
  });
  return { token, user: { email: user.email, role: user.role } };
}

export async function registerUser(email: string, password: string, role: 'ADMIN' | 'OPERATOR') {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError('El email ya está registrado', 400);
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role
    }
  });
  return { id: user.id, email: user.email, role: user.role };
}
