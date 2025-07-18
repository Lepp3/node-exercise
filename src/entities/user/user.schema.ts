import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  username: z.string().min(3).max(50).trim(),
  password: z.string().min(6).max(100),
  email: z.email().max(100),
  companyId: z.uuid(),
  modifiedBy: z.uuid(),
});
