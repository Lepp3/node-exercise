import { sequelize } from '../../config/database.js';
import { ProductProperties, ProductModel } from './product.model.js';
import { QueryTypes } from 'sequelize';
import { AppError } from '../../utility/appError.js';

export class ProductService {
  constructor(private readonly model = ProductModel) {}

  async getAll(): Promise<ProductModel[]> {
    const products = await this.model.findAll();
    if (!products) {
      throw new AppError('Internal Server Error');
    }
    return products;
  }

  async getById(productId: string): Promise<ProductModel | null> {
    const product = await this.model.findByPk(productId);
    if (!product) {
      throw new AppError('Internal Server Error');
    }
    return product;
  }

  async create(productData: ProductProperties): Promise<ProductModel> {
    const createdProduct = await this.model.create(productData);
    if (!createdProduct) {
      throw new AppError('Internal Server Error');
    }
    return createdProduct;
  }

  async update(
    productId: string,
    productData: ProductProperties
  ): Promise<ProductModel> {
    const [count] = await this.model.update(productData, {
      where: { id: productId },
    });
    if (count === 0) {
      throw new AppError(`Product with id ${productId} not found`);
    }
    const updated = await this.model.findByPk(productId);
    if (!updated) {
      throw new AppError(`Product fetch failed after update`);
    }
    return updated;
  }

  async delete(productId: string): Promise<void> {
    const product = await this.model.findByPk(productId);
    if (!product) {
      throw new AppError(`Product with ID ${productId} does not exist`);
    }
    try {
      await product.destroy();
    } catch (error) {
      throw new AppError('Internal Server Error');
    }
  }

  async getBestSellingProduct() {
    const results = await sequelize.query(
      `SELECT p.name AS "productName",
         SUM(oi.quantity) AS "totalSold"
        FROM "orderItems" oi
        JOIN "order" o ON o.id = oi."orderId"
        JOIN "product" p ON p.id = oi."productId"
        WHERE o.type = 'delivery'
          AND oi."deletedAt" IS NULL
          AND o."deletedAt" IS NULL
          AND p."deletedAt" IS NULL
        GROUP BY p.name
        ORDER BY SUM(oi.quantity) DESC
      `,
      { type: QueryTypes.SELECT }
    );

    if (!results) {
      throw new AppError('Internal Server Error');
    }

    return results?.[0] || null;
  }

  async getMaxStockProduct() {
    const results = await sequelize.query(
      `
    SELECT s."warehouseName",
           MIN(s."productName") AS "name_of_product",
           MAX(s."stockLevel") AS "max_product"
    FROM (
      SELECT w.name AS "warehouseName",
             p.name AS "productName",
             SUM(
               CASE
                 WHEN o.type = 'shipment' THEN oi.quantity
                 WHEN o.type = 'delivery' THEN -oi.quantity
                 ELSE NULL
               END
             ) AS "stockLevel"
      FROM "order" o
      JOIN "orderItems" oi ON o.id = oi."orderId"
      JOIN "product" p ON p.id = oi."productId"
      JOIN "warehouse" w ON o."warehouseId" = w.id
      WHERE o."deletedAt" IS NULL
        AND oi."deletedAt" IS NULL
        AND p."deletedAt" IS NULL
      GROUP BY w.name, p.name
    ) s
    GROUP BY s."warehouseName"
    ORDER BY MAX(s."stockLevel") DESC
    `,
      { type: QueryTypes.SELECT }
    );

    if (!results) {
      throw new AppError('Internal Server Error');
    }

    return results;
  }
}
