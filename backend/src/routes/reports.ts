import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleGuard } from '../middlewares/roleGuard';
import { getLowStockProducts } from '../services/productService';

const router = Router();

router.get('/low-stock', authMiddleware, roleGuard(['ADMIN']), async (req, res, next) => {
  try {
    const products = await getLowStockProducts();
    res.json({ status: 'success', data: products });
  } catch (error) {
    next(error);
  }
});

export default router;
