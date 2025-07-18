import { Router, Request, Response, NextFunction } from 'express';
import { OrderItemsService } from './orderItems.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { orderItemSchema } from './orderItems.schema.js';

const orderItemsController = Router();
const orderItemsService = new OrderItemsService();

orderItemsController.get(
  '/',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await orderItemsService.getAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
);

orderItemsController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.id;
    try {
      const item = await orderItemsService.getById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
);

orderItemsController.post(
  '/',
  validateBody(orderItemSchema),
  async (req: Request, res: Response) => {
    try {
      const newItem = await orderItemsService.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

orderItemsController.put(
  '/:id',
  validateBody(orderItemSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.id;
    try {
      const updatedItem = await orderItemsService.update(itemId, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }
);

orderItemsController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const itemId = req.params.id;
    try {
      await orderItemsService.delete(itemId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default orderItemsController;
