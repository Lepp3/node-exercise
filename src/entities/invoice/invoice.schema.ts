import { z } from 'zod';

export const invoiceSchema = z.object({
  date: z.coerce.date(),
  orderId: z.uuid(),
  modifiedBy: z.uuid(),
});
