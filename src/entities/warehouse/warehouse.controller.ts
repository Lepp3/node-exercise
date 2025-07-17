import { Router, Request, Response } from 'express';
import { WarehouseService } from './warehouse.service.js';

const warehouseController = Router();
const warehouseService = new WarehouseService();

warehouseController.get('/', async (req: Request, res: Response) => {
  try {
    const warehouses = await warehouseService.getAll();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json(error);
  }
});

warehouseController.get('/:id', async (req: Request, res: Response) => {
  const warehouseId = req.params.id;
  try {
    const warehouse = await warehouseService.getById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json(error);
  }
});

warehouseController.post('/', async (req: Request, res: Response) => {
  const newWarehouseInfo = req.body;
  try {
    const newWarehouse = await warehouseService.create(newWarehouseInfo);
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json(error);
  }
});

warehouseController.put('/:id', async (req: Request, res: Response) => {
  const warehouseId = req.params.id;
  const updatedInfo = req.body;
  try {
    const updatedWarehouse = await warehouseService.update(
      warehouseId,
      updatedInfo
    );
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    res.status(500).json(error);
  }
});

warehouseController.delete('/:id', async (req: Request, res: Response) => {
  const warehouseId = req.params.id;
  try {
    await warehouseService.delete(warehouseId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});
