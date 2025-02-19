import { Router } from 'express';
import { UserController } from './user.controller';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/:id', UserController.getUserById);

// Protected routes - require JWT authentication
router.get('/profile', protect, UserController.getUserById);

// Routes accessible by admin and managers
router.get('/', protect, authorize('admin', 'manager'), UserController.getAllUsers);

// Routes accessible only by admin
router.route('/admin/:id')
  .get(protect, authorize('admin'), UserController.getUserById)
  .put(protect, authorize('admin'), UserController.updateUser)
  .delete(protect, authorize('admin'), UserController.deleteUser);

export default router;