import { Request, Response } from 'express';
import { ServiceService } from './service.service';
import { CustomError } from '../../middlewares/errorHandler';
import { createSuccessResponse, createErrorResponse } from '../../utils/response';
import { getPaginationOptions, buildSearchQuery, createPaginationResult } from '../../utils/queryUtils';

export const ServiceController = {
  createService: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await ServiceService.createService(req.body, req.file);
      res.status(201).json(createSuccessResponse('Service created successfully', { service }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = 400;
      res.status(400).json(createErrorResponse(err.message));
    }
  },

  getAllServices: async (req: Request, res: Response): Promise<void> => {
    try {
      const { skip, limit, page } = getPaginationOptions(req);

      const searchOptions = {
        title: { type: 'string' as const, field: 'title', regex: true },
        category: { type: 'string' as const, field: 'category', regex: true },
        status: { type: 'string' as const, field: 'status', regex: true },
        price: { type: 'number' as const, field: 'price' },
        rating: { type: 'number' as const, field: 'rating' },
        reviewCount: { type: 'number' as const, field: 'reviewCount' }
      };

      const searchQuery = buildSearchQuery(req, searchOptions);

      const [services, total] = await Promise.all([
        ServiceService.getAllServices(skip, limit, searchQuery),
        ServiceService.countServices(searchQuery)
      ]);

      const paginationData = createPaginationResult(services, total, { page, limit });

      res.status(200).json(createSuccessResponse('Successfully retrieved services', paginationData));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = 400;
      res.status(400).json(createErrorResponse(err.message));
    }
  },

  getServiceById: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await ServiceService.getServiceById(req.params.id);
      if (!service) {
        res.status(404).json(createErrorResponse('Service not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('Service found successfully', { service }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },

  updateService: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await ServiceService.updateService(req.params.id, req.body, req.file);
      if (!service) {
        res.status(404).json(createErrorResponse('Service not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('Service updated successfully', { service }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },

  deleteService: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await ServiceService.deleteService(req.params.id);
      if (!service) {
        res.status(404).json(createErrorResponse('Service not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('Service deleted successfully', { message: 'Service deleted successfully' }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },
};