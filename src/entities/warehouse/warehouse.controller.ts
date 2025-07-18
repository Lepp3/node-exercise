import { Router, Request, Response, NextFunction } from 'express';
import { WarehouseService } from './warehouse.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { warehouseSchema } from './warehouse.schema.js';

const warehouseController = Router();
const warehouseService = new WarehouseService();

warehouseController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warehouses = await warehouseService.getAll();
      res.status(200).json(warehouses);
    } catch (error) {
      next(error);
    }
  }
);

warehouseController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const warehouseId = req.params.id;
    try {
      const warehouse = await warehouseService.getById(warehouseId);
      if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      res.status(200).json(warehouse);
    } catch (error) {
      next(error);
    }
  }
);

warehouseController.post(
  '/',
  validateBody(warehouseSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newWarehouse = await warehouseService.create(req.body);
      res.status(201).json(newWarehouse);
    } catch (error) {
      next(error);
    }
  }
);

warehouseController.put(
  '/:id',
  validateBody(warehouseSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const warehouseId = req.params.id;
    try {
      const updatedWarehouse = await warehouseService.update(
        warehouseId,
        req.body
      );
      res.status(200).json(updatedWarehouse);
    } catch (error) {
      next(error);
    }
  }
);

warehouseController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const warehouseId = req.params.id;
    try {
      await warehouseService.delete(warehouseId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default warehouseController;
