import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody =
  <T>(schema: ZodType<T, any, any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body) as T;
      next();
    } catch (error) {
      next(error);
    }
  };
