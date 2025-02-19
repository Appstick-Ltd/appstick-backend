import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CustomError } from '../../middlewares/errorHandler';
import { createSuccessResponse, createErrorResponse } from '../../utils/response';
import { LoginCredentials, RegisterCredentials } from './auth.interface';

export const AuthController = {
  getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json(
          createErrorResponse('Not authenticated')
        );
        return;
      }

      res.status(200).json(
        createSuccessResponse('Profile retrieved successfully', { user: req.user })
      );
    } catch (error) {
      const err = error as CustomError;
      res.status(500).json(
        createErrorResponse(err.message)
      );
    }
  },
  
  login: async (req: Request<{}, {}, LoginCredentials>, res: Response): Promise<void> => {
    try {
      const { token, user } = await AuthService.login(req.body);
      res.status(200).json(
        createSuccessResponse('Login successful', { token, user })
      );
    } catch (error) {
      const err = error as CustomError;
      res.status(401).json(
        createErrorResponse(err.message)
      );
    }
  },

  register: async (req: Request<{}, {}, RegisterCredentials>, res: Response): Promise<void> => {
    try {
      const { token, user } = await AuthService.register(req.body);
      res.status(201).json(
        createSuccessResponse('Registration successful', { token, user })
      );
    } catch (error) {
      const err = error as CustomError;
      res.status(400).json(
        createErrorResponse(err.message)
      );
    }
  }
};