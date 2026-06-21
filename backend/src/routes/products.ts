import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleGuard } from '../middlewares/roleGuard';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const category = req.query.category as string | undefined;
    const products = await getProducts(category);
    res.json({ status: 'success', data: products });
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, roleGuard(['ADMIN']), async (req, res, next) => {
  try {
    const { name, sku, stock, minStock, price, categoryName } = req.body;
    const product = await createProduct({ name, sku, stock, minStock, price, categoryName });
    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, roleGuard(['ADMIN']), async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, roleGuard(['ADMIN']), async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
