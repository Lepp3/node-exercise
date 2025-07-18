import { z } from 'zod';

export const invoiceSchema = z.object({
  companyId: z.uuid(),
  orderId: z.uuid(),
  date: z.date(),
  modifiedBy: z.uuid(),
});
