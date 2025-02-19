import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';
import { createSuccessResponse, createErrorResponse } from './utils/response';
import { registerRoutes } from './routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Register all routes
registerRoutes(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json(createSuccessResponse('Service is healthy', { status: 'ok' }));
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json(createErrorResponse('Route not found'));
});

export default app;