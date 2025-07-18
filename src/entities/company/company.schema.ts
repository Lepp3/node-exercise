import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1).max(100).trim(),
  modifiedBy: z.uuid(),
});
