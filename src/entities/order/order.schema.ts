import { z } from 'zod';
import { OrderTypeEnum } from '../../utility/utilityTypes.js';

export const orderSchema = z.object({
  companyId: z.uuid(),
  partnerId: z.uuid(),
  type: z.enum([OrderTypeEnum.Delivery, OrderTypeEnum.Shipment]),
  warehouseId: z.uuid(),
  date: z.coerce.date().optional(),
  modifiedBy: z.uuid(),
});
