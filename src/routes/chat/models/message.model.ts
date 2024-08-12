import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.number(),
  to_user_id: z.string().uuid(),
  from_user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.coerce.date()
})

export type Message = z.infer<typeof MessageSchema>
