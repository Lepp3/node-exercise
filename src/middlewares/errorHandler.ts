import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utility/appError.js';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('RAW ERROR:', err);
  console.error('instanceof AppError:', err instanceof AppError);
  console.error('constructor:', err.constructor?.name);
  console.error('has statusCode:', 'statusCode' in err);
  if (err instanceof ZodError) {
    res.status(400).json({ status: 'Validation error' });
    return;
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
