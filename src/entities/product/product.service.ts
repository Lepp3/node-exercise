import { sequelize } from '../../config/database.js';
import { ProductProperties, ProductModel } from './product.model.js';
import { QueryTypes } from 'sequelize';

export class ProductService {
  constructor(private readonly model = ProductModel) {}

  async getAll(): Promise<ProductModel[]> {
    return await this.model.findAll();
  }

  async getById(id: string): Promise<ProductModel | null> {
    return await this.model.findByPk(id);
  }

  async create(data: ProductProperties): Promise<ProductModel> {
    return await this.model.create(data);
  }

  async update(
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

  async delete(productId: string): Promise<void> {
    const product = await this.model.findByPk(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }

    await product.destroy();
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

    return results;
  }
}
