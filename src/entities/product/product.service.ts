import { ProductModel } from '../../models/index.js';
import { ProductProperties } from './product.model.js';

export class ProductService {
  constructor(private readonly model = ProductModel) {}

  async getAllProducts(): Promise<ProductModel[]> {
    return await this.model.findAll();
  }

  async getProductById(id: string): Promise<ProductModel | null> {
    return await this.model.findByPk(id);
  }

  async createProduct(data: ProductProperties): Promise<ProductModel> {
    return await this.model.create(data);
  }

  async updateProduct(
    productId: string,
    data: ProductProperties
  ): Promise<ProductModel> {
    const [count] = await this.model.update(data, { where: { id: productId } });
    if (count === 0) {
      throw new Error(`Product with id ${productId} not found`);
    }
    const updated = await this.model.findByPk(productId);
    if (!updated) {
      throw new Error(`Product fetch failed after update`);
    }
    return updated;
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.model.findByPk(productId, { paranoid: false });
    if (!product) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }
    if (product.deletedAt) {
      throw new Error(`Product with ID ${productId} is already deleted`);
    }
    await product.destroy();
  }
}
