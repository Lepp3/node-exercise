import { OrderProperties, OrderModel } from './order.model.js';
import { AppError } from '../../utility/appError.js';

export class OrderService {
  constructor(private readonly model = OrderModel) {}

  async getAll(): Promise<OrderModel[]> {
    return await this.model.findAll();
  }

  async getById(orderId: string): Promise<OrderModel | null> {
    const order = await this.model.findByPk(orderId);
    if (!order) {
      throw new AppError('Internal Server Error');
    }
    return order;
  }

  async create(orderData: OrderProperties): Promise<OrderModel> {
    const createdOrder = await this.model.create(orderData);

    if (!createdOrder) {
      throw new AppError('Internal Server Error');
    }

    return createdOrder;
  }

  async update(
    orderId: string,
    orderData: OrderProperties
  ): Promise<OrderModel> {
    const [count] = await this.model.update(orderData, {
      where: { id: orderId },
    });
    if (count === 0) {
      throw new AppError(`Order with id ${orderId} not found`);
    }
    const updated = await this.model.findByPk(orderId);
    if (!updated) {
      throw new AppError(`Internal Server Error`);
    }
    return updated;
  }

  async delete(orderId: string): Promise<any> {
    const order = await this.model.findByPk(orderId);
    if (!order) {
      throw new AppError(`Order with ID ${orderId} does not exist`);
    }

    try {
      await order.destroy();
    } catch (err) {
      throw new AppError(`Failed to delete order ${orderId}`);
    }
  }
}
