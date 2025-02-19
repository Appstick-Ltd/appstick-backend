import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from './user.controller';
import { protect, authorize, isOwnProfileOrAdmin } from '../../middlewares/authMiddleware';
import { IUser } from './user.interface';
import { Types } from 'mongoose';

interface AuthenticatedRequest extends Request {
  user?: IUser & { _id: Types.ObjectId };
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser & { _id: Types.ObjectId };
    }
  }
}

const router = Router();

// Protected routes - users can access their own profile
router.route('/:id')
  .get(protect, UserController.getUserById)
  .put(protect, isOwnProfileOrAdmin, UserController.updateUser)
  .delete(protect, isOwnProfileOrAdmin, UserController.deleteUser);

// Routes accessible by admin and managers
router.get('/', protect, authorize('admin', 'manager'), UserController.getAllUsers);

export default router;