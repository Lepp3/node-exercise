import { Router, Request, Response } from 'express';
import { OrderItemsService } from './orderItems.service.js';

const orderItemsController = Router();
const orderItemsService = new OrderItemsService();

orderItemsController.get('/', async (req: Request, res: Response) => {
  try {
    const items = await orderItemsService.getAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderItemsController.get('/:id', async (req: Request, res: Response) => {
  const itemId = req.params.id;
  try {
    const item = await orderItemsService.getById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderItemsController.post('/', async (req: Request, res: Response) => {
  const itemData = req.body;
  try {
    const newItem = await orderItemsService.create(itemData);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderItemsController.put('/:id', async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedItem = await orderItemsService.update(itemId, updatedData);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderItemsController.delete('/:id', async (req: Request, res: Response) => {
  const itemId = req.params.id;
  try {
    await orderItemsService.delete(itemId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

export default orderItemsController;
