import { PartnerModel } from '../../models/index.js';
import { PartnerProperties } from './partner.model.js';

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
    const partner = await this.model.findByPk(partnerId, { paranoid: false });
    if (!partner) {
      throw new Error(`Partner with ID ${partnerId} does not exist`);
    }
    if (partner.deletedAt) {
      throw new Error(`Partner with ID ${partnerId} is already deleted`);
    }
    await partner.destroy();
  }
}
