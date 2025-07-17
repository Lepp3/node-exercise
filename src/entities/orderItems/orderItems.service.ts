import { OrderItemsModel } from '../../models/index.js';
import { OrderItemsProperties } from './orderItems.model.js';

export class OrderItemsService {
  constructor(private readonly model = OrderItemsModel) {}

  async getAll(): Promise<OrderItemsModel[]> {
    return await this.model.findAll();
  }

  async getById(orderItemId: string): Promise<OrderItemsModel | null> {
    return await this.model.findByPk(orderItemId);
  }

  async create(orderItemData: OrderItemsProperties): Promise<OrderItemsModel> {
    return await this.model.create(orderItemData);
  }

  async update(
    orderItemId: string,
    orderItemData: OrderItemsProperties
  ): Promise<OrderItemsModel> {
    const [updatedCount] = await this.model.update(orderItemData, {
      where: { id: orderItemId },
    });

    if (updatedCount === 0) {
      throw new Error(`OrderItem with id ${orderItemId} not found`);
    }

    const updated = await this.model.findByPk(orderItemId);
    if (!updated) {
      throw new Error(`OrderItem fetch failed after update`);
    }

    return updated;
  }

  async delete(orderItemId: string): Promise<void> {
    const orderItem = await this.model.findByPk(orderItemId, {
      paranoid: false,
    });

    if (!orderItem) {
      throw new Error(`OrderItem with ID ${orderItemId} does not exist`);
    }

    if (orderItem.deletedAt) {
      throw new Error(`OrderItem with ID ${orderItemId} is already deleted`);
    }

    await orderItem.destroy();
  }
}
