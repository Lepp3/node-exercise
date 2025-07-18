import { WarehouseProperties, WarehouseModel } from './warehouse.model.js';
import { AppError } from '../../utility/appError.js';

export class WarehouseService {
  constructor(private readonly model = WarehouseModel) {}

  async getAll(): Promise<WarehouseModel[]> {
    const warehouses = await this.model.findAll();
    if (!warehouses) {
      throw new AppError('Internal Server Error');
    }
    return warehouses;
  }

  async getById(warehouseId: string): Promise<WarehouseModel | null> {
    const warehouse = await this.model.findByPk(warehouseId);
    if (!warehouse) {
      throw new AppError('Internal Server Error');
    }
    return warehouse;
  }

  async create(warehouseData: WarehouseProperties): Promise<WarehouseModel> {
    const createdWarehouse = await this.model.create(warehouseData);
    if (!createdWarehouse) {
      throw new AppError('Internal Server Error');
    }
    return createdWarehouse;
  }

  async update(
    warehouseId: string,
    warehouseData: WarehouseProperties
  ): Promise<WarehouseModel> {
    const [count] = await this.model.update(warehouseData, {
      where: { id: warehouseId },
    });
    if (count === 0) {
      throw new AppError(`Warehouse with id ${warehouseId} not found`);
    }
    const updated = await this.model.findByPk(warehouseId);
    if (!updated) {
      throw new AppError(`Warehouse fetch failed after update`);
    }
    return updated;
  }

  async delete(warehouseId: string): Promise<void> {
    const warehouse = await this.model.findByPk(warehouseId);
    if (!warehouse) {
      throw new AppError(`Warehouse with ID ${warehouseId} does not exist`);
    }
    try {
      await warehouse.destroy();
    } catch (error) {
      throw new AppError('Internal Server Error');
    }
  }
}
