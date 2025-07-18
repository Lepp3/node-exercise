import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from './user.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { userSchema } from './user.schema.js';

const userController = Router();
const userService = new UserService();

userController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

userController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const user = await userService.getById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

userController.post(
  '/',
  validateBody(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await userService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userController.put(
  '/:id',
  validateBody(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const updatedUser = await userService.update(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      await userService.delete(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default userController;
