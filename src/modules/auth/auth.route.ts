import { Router } from 'express';
import { AuthController } from './auth.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// Protected routes
router.get('/profile', protect, AuthController.getProfile);

export default router;