import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utility/appError.js';
import { ZodError } from 'zod';
import { DatabaseError } from 'sequelize';

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({ status: 'Validation error' });
    return;
  }
  if (err instanceof DatabaseError) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid input or query error',
    });
  }
  if (err instanceof AppError) {
    console.log('App error instance');
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    console.error('Internal Server error');
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
