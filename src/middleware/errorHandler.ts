import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Error interno del servidor';

  console.error(`❌ [${req.method}] ${req.originalUrl} →`, message);

  res.status(statusCode).json({
    error: message
  });
}
