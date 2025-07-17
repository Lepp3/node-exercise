import { Router, Request, Response } from 'express';
import { OrderService } from './order.service.js';

const orderController = Router();
const orderService = new OrderService();

orderController.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderController.get('/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const order = await orderService.getById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderController.post('/', async (req: Request, res: Response) => {
  const newOrderInfo = req.body;
  try {
    const newOrder = await orderService.create(newOrderInfo);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderController.put('/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const updatedInfo = req.body;
  try {
    const updatedOrder = await orderService.update(orderId, updatedInfo);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

orderController.delete('/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    await orderService.delete(orderId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

export default orderController;
