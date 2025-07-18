import { OrderItemsProperties, OrderItemsModel } from './orderItems.model.js';
import { AppError } from '../../utility/appError.js';

export class OrderItemsService {
  constructor(private readonly model = OrderItemsModel) {}

  async getAll(): Promise<OrderItemsModel[]> {
    const orderItems = await this.model.findAll();
    if (!orderItems) {
      throw new AppError('Internal Server Error');
    }
    return orderItems;
  }

  async getById(orderItemId: string): Promise<OrderItemsModel | null> {
    const orderItems = await this.model.findByPk(orderItemId);
    if (!orderItems) {
      throw new AppError('Internal Server Error');
    }
    return orderItems;
  }

  async create(orderItemData: OrderItemsProperties): Promise<OrderItemsModel> {
    const createdItems = await this.model.create(orderItemData);
    if (!createdItems) {
      throw new AppError('Internal Server Error');
    }
    return createdItems;
  }

  async update(
    orderItemId: string,
    orderItemData: OrderItemsProperties
  ): Promise<OrderItemsModel> {
    const [updatedCount] = await this.model.update(orderItemData, {
      where: { id: orderItemId },
    });

    if (updatedCount === 0) {
      throw new AppError(`OrderItem with id ${orderItemId} not found`);
    }

    const updated = await this.model.findByPk(orderItemId);
    if (!updated) {
      throw new AppError(`OrderItem fetch failed after update`);
    }

    return updated;
  }

  async delete(orderItemId: string): Promise<void> {
    const orderItem = await this.model.findByPk(orderItemId);

    if (!orderItem) {
      throw new AppError(`OrderItem with ID ${orderItemId} does not exist`);
    }

    try {
      await orderItem.destroy();
    } catch (error) {
      throw new AppError('Failed to delete order items');
    }
  }
}
