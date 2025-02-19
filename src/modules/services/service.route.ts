import { Router } from 'express';
import { protect, authorize } from '../../middlewares/authMiddleware';
import { ServiceController } from './service.controller';

const router = Router();

// Public routes - anyone can view services
router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServiceById);

// Protected routes - only admin and manager can modify services
router.post('/', protect, authorize('admin', 'manager'), ServiceController.createService);
router.put('/:id', protect, authorize('admin', 'manager'), ServiceController.updateService);
router.delete('/:id', protect, authorize('admin', 'manager'), ServiceController.deleteService);

export default router;