import { z } from 'zod';
import { PartnerTypeEnum } from '../../utility/utilityTypes.js';

export const partnerSchema = z.object({
  name: z.string().min(1).max(100),
  companyId: z.uuid(),
  type: z.enum([PartnerTypeEnum.Customer, PartnerTypeEnum.Supplier]),
  modifiedBy: z.uuid(),
});
