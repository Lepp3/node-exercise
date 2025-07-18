import { InvoiceProperties, InvoiceModel } from './invoice.model.js';
import { AppError } from '../../utility/appError.js';

export class InvoiceService {
  constructor(private readonly model = InvoiceModel) {}

  async getAll(): Promise<InvoiceModel[]> {
    const invoices = await this.model.findAll();
    if (!invoices) {
      throw new AppError('Internal Server Error');
    }
    return invoices;
  }

  async getById(invoiceId: string): Promise<InvoiceModel | null> {
    const invoice = await this.model.findByPk(invoiceId);
    if (!invoice) {
      throw new AppError('Internal Server Error');
    }
    return invoice;
  }

  async create(invoiceData: InvoiceProperties): Promise<InvoiceModel> {
    const createdInvoice = await this.model.create(invoiceData);
    if (!createdInvoice) {
      throw new AppError('Internal Server Error');
    }
    return createdInvoice;
  }

  async update(
    invoiceId: string,
    invoiceData: InvoiceProperties
  ): Promise<InvoiceModel> {
    const [count] = await this.model.update(invoiceData, {
      where: { id: invoiceId },
    });
    if (count === 0) {
      throw new AppError(`Invoice with id ${invoiceId} not found`);
    }
    const updated = await this.model.findByPk(invoiceId);
    if (!updated) {
      throw new AppError(`Invoice fetch failed after update`);
    }
    return updated;
  }

  async delete(invoiceId: string): Promise<void> {
    const invoice = await this.model.findByPk(invoiceId);
    if (!invoice) {
      throw new AppError(`Invoice with ID ${invoiceId} does not exist`);
    }
    try {
      await invoice.destroy();
    } catch (error) {
      throw new AppError('Internal Server Error');
    }
  }
}
