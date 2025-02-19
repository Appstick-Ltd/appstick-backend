import { Router } from 'express';
import { ProductController } from './product.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

// Protected routes - only admin and manager can access
router.get('/', ProductController.getAllProducts);
router.post('/', protect, authorize('admin', 'manager'), ProductController.createProduct);

router.get('/:id', protect, ProductController.getProductById);
router.put('/:id', protect, authorize('admin', 'manager'), ProductController.updateProduct);
router.delete('/:id', protect, authorize('admin', 'manager'), ProductController.deleteProduct);

export default router;