import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Log request
  const logRequest = () => {
    const responseTime = Date.now() - startTime;
    const userId = (req as any).user?._id;

    logger.http('Request processed', {
      userId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      responseTime,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  };

  // Log after response is sent
  res.on('finish', logRequest);

  next();
};