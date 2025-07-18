import { CompanyProperties, CompanyModel } from './company.model.js';
import { AppError } from '../../utility/appError.js';

export class CompanyService {
  constructor(private readonly model = CompanyModel) {}

  async getAll(): Promise<CompanyModel[]> {
    const companies = await this.model.findAll();
    if (!companies) {
      throw new AppError('Internal Server Error');
    }
    return companies;
  }

  async getById(companyId: string): Promise<CompanyModel | null> {
    const company = await this.model.findByPk(companyId);
    if (!company) {
      throw new AppError('Internal Server Error');
    }
    return company;
  }

  async create(companyData: CompanyProperties): Promise<CompanyModel> {
    const createdCompany = await this.model.create(companyData);
    if (!createdCompany) {
      throw new AppError('Internal Server Error');
    }
    return createdCompany;
  }

  async update(
    companyId: string,
    companyData: CompanyProperties
  ): Promise<CompanyModel> {
    const [count] = await this.model.update(companyData, {
      where: { id: companyId },
    });
    if (count === 0) {
      throw new AppError(`Company with id ${companyId} not found`);
    }
    const updated = await this.model.findByPk(companyId);
    if (!updated) {
      throw new AppError(`Company fetch failed after update`);
    }
    return updated;
  }

  async delete(companyId: string): Promise<void> {
    const company = await this.model.findByPk(companyId);
    if (!company) {
      throw new AppError(`Company with ID ${companyId} does not exist`);
    }
    try {
      await company.destroy();
    } catch (error) {
      throw new AppError('Internal Server Error');
    }
  }
}
