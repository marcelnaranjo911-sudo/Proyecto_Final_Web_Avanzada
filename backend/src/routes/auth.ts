import { Router } from 'express';
import { loginUser, registerUser } from '../services/authService';
import { AppError } from '../utils/AppError';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      throw new AppError('Faltan datos de registro', 400);
    }
    const user = await registerUser(email, password, role);
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Email y contraseña son obligatorios', 400);
    }
    const result = await loginUser(email, password);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
});

export default router;
