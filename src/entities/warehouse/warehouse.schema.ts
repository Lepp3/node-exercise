import { z } from 'zod';
import { SupportTypeEnum } from '../../utility/utilityTypes.js';

export const warehouseSchema = z.object({
  companyId: z.uuid(),
  supportType: z.enum([SupportTypeEnum.Solid, SupportTypeEnum.Liquid]),
  name: z.string().min(1).max(100).trim(),
  modifiedBy: z.uuid(),
});
