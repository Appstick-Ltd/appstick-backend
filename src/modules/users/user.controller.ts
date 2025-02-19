import { Request, Response, RequestHandler } from 'express';
import { UserService } from './user.service';
import { CustomError } from '../../middlewares/errorHandler';
import { createSuccessResponse, createErrorResponse } from '../../utils/response';

export const UserController = {
  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(createSuccessResponse('User created successfully', { user }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = 400;
      res.status(400).json(createErrorResponse(err.message));
    }
  },

  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        UserService.getAllUsers(skip, limit),
        UserService.countUsers()
      ]);

      const totalPages = Math.ceil(total / limit);

      const paginationData = {
        docs: users,
        totalDocs: total,
        limit,
        page,
        totalPages,
        pagingCounter: skip + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null
      };

      res.status(200).json(createSuccessResponse('Successfully gets users', paginationData));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = 400;
      res.status(400).json(createErrorResponse(err.message));
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json(createErrorResponse('User not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('User found successfully', { user }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json(createErrorResponse('User not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('User updated successfully', { user }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json(createErrorResponse('User not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('User deleted successfully', { message: 'User deleted successfully' }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },
}; 