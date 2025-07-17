import { CompanyModel } from '../../models/index.js';
import { CompanyProperties } from './company.model.js';

export class CompanyService {
  constructor(private readonly model = CompanyModel) {}

  async getAll(): Promise<CompanyModel[]> {
    return await this.model.findAll();
  }

  async getById(companyId: string): Promise<CompanyModel | null> {
    return await this.model.findByPk(companyId);
  }

  async create(companyData: CompanyProperties): Promise<CompanyModel> {
    return await this.model.create(companyData);
  }

  async update(
    companyId: string,
    companyData: CompanyProperties
  ): Promise<CompanyModel> {
    const [updatedCount] = await this.model.update(companyData, {
      where: { id: companyId },
    });

    if (updatedCount === 0) {
      throw new Error(`Company with id ${companyId} not found`);
    }

    const updated = await this.model.findByPk(companyId);
    if (!updated) {
      throw new Error(`Company fetch failed after update`);
    }

    return updated;
  }

  async delete(companyId: string): Promise<void> {
    const company = await this.model.findByPk(companyId, { paranoid: false });

    if (!company) {
      throw new Error(`Company with ID ${companyId} does not exist`);
    }

    if (company.deletedAt) {
      throw new Error(`Company with ID ${companyId} is already deleted`);
    }

    await company.destroy();
  }
}
