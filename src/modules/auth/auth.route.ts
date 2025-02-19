import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

// Public routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;