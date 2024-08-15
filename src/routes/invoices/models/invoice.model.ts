import { z } from 'zod';

export const InvoiceSchema = z.object({
  id: z.number(),
  created_at: z.coerce.date(),
  userID: z.string().uuid(),
  dataJson: z.record(z.unknown())
});

export type Invoice = z.infer<typeof InvoiceSchema>;