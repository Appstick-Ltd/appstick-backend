import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CustomError } from '../../middlewares/errorHandler';
import { createSuccessResponse, createErrorResponse } from '../../utils/response';
import { getPaginationOptions, buildSearchQuery, createPaginationResult } from '../../utils/queryUtils';

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
      const { skip, limit, page } = getPaginationOptions(req);

      const searchOptions = {
        name: { type: 'string' as const, field: 'name', regex: true },
        email: { type: 'string' as const, field: 'email', regex: true },
        role: { type: 'string' as const, field: 'role', regex: true },
        department: { type: 'string' as const, field: 'department', regex: true },
        active: { type: 'boolean' as const, field: 'active' }
      };

      const searchQuery = buildSearchQuery(req, searchOptions);

      const [users, total] = await Promise.all([
        UserService.getAllUsers(skip, limit, searchQuery),
        UserService.countUsers(searchQuery)
      ]);

      const paginationData = createPaginationResult(users, total, { page, limit });

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