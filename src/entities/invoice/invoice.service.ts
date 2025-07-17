import { InvoiceModel } from '../../models/index.js';
import { InvoiceProperties } from './invoice.model.js';

export class InvoiceService {
  constructor(private readonly model = InvoiceModel) {}

  async getAll(): Promise<InvoiceModel[]> {
    return await this.model.findAll();
  }

  async getById(id: string): Promise<InvoiceModel | null> {
    return await this.model.findByPk(id);
  }

  async create(invoiceData: InvoiceProperties): Promise<InvoiceModel> {
    return await this.model.create(invoiceData);
  }

  async update(
    invoiceId: string,
    data: InvoiceProperties
  ): Promise<InvoiceModel> {
    const [count] = await this.model.update(data, { where: { id: invoiceId } });
    if (count === 0) {
      throw new Error(`Invoice with id ${invoiceId} not found`);
    }
    const updated = await this.model.findByPk(invoiceId);
    if (!updated) {
      throw new Error(`Invoice fetch failed after update`);
    }
    return updated;
  }

  async delete(invoiceId: string): Promise<void> {
    const invoice = await this.model.findByPk(invoiceId);
    if (!invoice) {
      throw new Error(`Invoice with ID ${invoiceId} does not exist`);
    }

    await invoice.destroy();
  }
}
