import { Router, Request, Response, NextFunction } from 'express';
import { InvoiceService } from './invoice.service.js';
import { validateBody } from '../../middlewares/validateBodyWithSchema.js';
import { invoiceSchema } from './invoice.schema.js';

const invoiceController = Router();
const invoiceService = new InvoiceService();

invoiceController.get(
  '/',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const invoices = await invoiceService.getAll();
      res.status(200).json(invoices);
    } catch (error) {
      next(error);
    }
  }
);

invoiceController.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.id;
    try {
      const invoice = await invoiceService.getById(invoiceId);
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
      res.status(200).json(invoice);
    } catch (error) {
      next(error);
    }
  }
);

invoiceController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newInvoice = await invoiceService.create(req.body);
      res.status(201).json(newInvoice);
    } catch (error) {
      next(error);
    }
  }
);

invoiceController.put(
  '/:id',
  validateBody(invoiceSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.id;
    try {
      const updatedInvoice = await invoiceService.update(invoiceId, req.body);
      res.status(200).json(updatedInvoice);
    } catch (error) {
      next(error);
    }
  }
);

invoiceController.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.id;
    try {
      await invoiceService.delete(invoiceId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default invoiceController;
