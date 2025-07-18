import { sequelize } from '../../config/database.js';
import { PartnerProperties, PartnerModel } from './partner.model.js';
import { QueryTypes } from 'sequelize';
import { AppError } from '../../utility/appError.js';

export class PartnerService {
  constructor(private readonly model = PartnerModel) {}

  async getAll(): Promise<PartnerModel[]> {
    const partners = await this.model.findAll();
    if (!partners) {
      throw new AppError('Internal Server Error');
    }

    return partners;
  }

  async getById(partnerId: string): Promise<PartnerModel | null> {
    const partner = await this.model.findByPk(partnerId);
    if (!partner) {
      throw new AppError('Internal Server Error');
    }
    return partner;
  }

  async create(partnerData: PartnerProperties): Promise<PartnerModel> {
    const createdPartner = await this.model.create(partnerData);
    if (!createdPartner) {
      throw new AppError('Internal Server Error');
    }

    return createdPartner;
  }

  async update(
    partnerId: string,
    partnerData: PartnerProperties
  ): Promise<PartnerModel> {
    const [count] = await this.model.update(partnerData, {
      where: { id: partnerId },
    });
    if (count === 0) {
      throw new AppError(`Partner with id ${partnerId} not found`);
    }
    const updated = await this.model.findByPk(partnerId);
    if (!updated) {
      throw new AppError(`Partner fetch failed after update`);
    }
    return updated;
  }

  async delete(partnerId: string): Promise<void> {
    const partner = await this.model.findByPk(partnerId);
    if (!partner) {
      throw new AppError(`Partner with ID ${partnerId} does not exist`);
    }
    try {
      await partner.destroy();
    } catch (error) {
      throw new AppError('Internal Server Error');
    }
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

    if (!results) {
      throw new AppError('Internal Server Error');
    }

    return results?.[0] ?? null;
  }
}
