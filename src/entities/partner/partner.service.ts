import { PartnerModel, sequelize } from '../../models/index.js';
import { PartnerProperties } from './partner.model.js';
import { QueryTypes } from 'sequelize';

export class PartnerService {
  constructor(private readonly model = PartnerModel) {}

  async getAll(): Promise<PartnerModel[]> {
    return await this.model.findAll();
  }

  async getById(partnerId: string): Promise<PartnerModel | null> {
    return await this.model.findByPk(partnerId);
  }

  async create(partnerData: PartnerProperties): Promise<PartnerModel> {
    return await this.model.create(partnerData);
  }

  async update(
    partnerId: string,
    partnerData: PartnerProperties
  ): Promise<PartnerModel> {
    const [count] = await this.model.update(partnerData, {
      where: { id: partnerId },
    });
    if (count === 0) {
      throw new Error(`Partner with id ${partnerId} not found`);
    }
    const updated = await this.model.findByPk(partnerId);
    if (!updated) {
      throw new Error(`Partner fetch failed after update`);
    }
    return updated;
  }

  async delete(partnerId: string): Promise<void> {
    const partner = await this.model.findByPk(partnerId);
    if (!partner) {
      throw new Error(`Partner with ID ${partnerId} does not exist`);
    }

    await partner.destroy();
  }

  async getLoyalCustomer() {
    const results = await sequelize.query(
      `
    SELECT o."companyId",
           c.name AS "customerName",
           count(o.id) AS "totalOrders"
    FROM "order" o
    JOIN partner c ON c.id = o."partnerId"
    WHERE o.type = 'delivery'
      AND o."deletedAt" IS NULL AND c."deletedAt" IS NULL
    GROUP BY o."companyId", c.name
    ORDER BY count(o.id) DESC
    LIMIT 1
    `,
      { type: QueryTypes.SELECT }
    );

    return results?.[0] ?? null;
  }
}
