import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.uuid(),
  orderId: z.string().uuid(),
  quantity: z.number().int().positive(),
  modifiedBy: z.uuid(),
});
