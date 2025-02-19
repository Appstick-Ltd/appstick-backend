import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modules/users/user.model';
import { IUser } from '../modules/users/user.interface';
import { createErrorResponse } from '../utils/response';
import { Types } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser & { _id: Types.ObjectId };
    }
  }
}

export const protect: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json(
        createErrorResponse('Not authorized to access this route')
      );
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
      const user = await User.findById(decoded._id).select('-password');

      if (!user) {
        res.status(401).json(
          createErrorResponse('User not found')
        );
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json(
        createErrorResponse('Not authorized to access this route')
      );
      return;
    }
  } catch (error) {
    res.status(500).json(
      createErrorResponse('Error authenticating user')
    );
    return;
  }
};

// Role authorization middleware
// Check if user has access to the profile
export const isOwnProfileOrAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json(
      createErrorResponse('Not authorized to access this route')
    );
    return;
  }

  if (req.user._id.toString() === req.params.id || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json(
      createErrorResponse('Not authorized to access this profile')
    );
  }
};

export const authorize = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(
        createErrorResponse('Not authorized to access this route')
      );
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json(
        createErrorResponse(`User role ${req.user.role} is not authorized to access this route`)
      );
      return;
    }

    next();
  };
};