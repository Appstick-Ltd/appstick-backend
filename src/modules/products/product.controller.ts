import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { CustomError } from '../../middlewares/errorHandler';
import { createSuccessResponse, createErrorResponse } from '../../utils/response';
import { getPaginationOptions, buildSearchQuery, createPaginationResult } from '../../utils/queryUtils';

export const ProductController = {
  createProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductService.createProduct(req.body, req.file);
      res.status(201).json(createSuccessResponse('Product created successfully', { product }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = 400;
      res.status(400).json(createErrorResponse(err.message));
    }
  },

  getAllProducts: async (req: Request, res: Response): Promise<void> => {
    try {
      const { skip, limit, page } = getPaginationOptions(req);

      const searchOptions = {
        name: { type: 'string' as const, field: 'name', regex: true },
        techStack: { type: 'string' as const, field: 'techStack', regex: true },
        price: { type: 'string' as const, field: 'price', regex: true },
        sales: { type: 'number' as const, field: 'sales' },
        reviews: { type: 'number' as const, field: 'reviews' },
        likes: { type: 'number' as const, field: 'likes' }
      };

      const searchQuery = buildSearchQuery(req, searchOptions);

      const [products, total] = await Promise.all([
        ProductService.getAllProducts(skip, limit, searchQuery),
        ProductService.countProducts(searchQuery)
      ]);

      const paginationData = createPaginationResult(products, total, { page, limit });

      res.status(200).json(createSuccessResponse('Successfully retrieved products', paginationData));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = 400;
      res.status(400).json(createErrorResponse(err.message));
    }
  },

  getProductById: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json(createErrorResponse('Product not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('Product found successfully', { product }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },

  updateProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body, req.file);
      if (!product) {
        res.status(404).json(createErrorResponse('Product not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('Product updated successfully', { product }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },

  deleteProduct: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product) {
        res.status(404).json(createErrorResponse('Product not found'));
        return;
      }
      res.status(200).json(createSuccessResponse('Product deleted successfully', { message: 'Product deleted successfully' }));
    } catch (error) {
      const err = error as CustomError;
      err.statusCode = err.statusCode || 400;
      res.status(err.statusCode).json(createErrorResponse(err.message));
    }
  },
};