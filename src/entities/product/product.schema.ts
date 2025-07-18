import { z } from 'zod';
import { SupportTypeEnum } from '../../utility/utilityTypes.js';

export const productSchema = z.object({
  companyId: z.uuid(),
  type: z.enum([SupportTypeEnum.Liquid, SupportTypeEnum.Solid]),
  name: z.string().min(1).max(100).trim(),
  price: z.number().positive(),
  modifiedBy: z.uuid(),
});
