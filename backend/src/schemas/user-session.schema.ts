import zod from "zod";

export const UserSessionSchema = zod.object({
  id: zod.number(),
  user_id: zod.number(),
  refresh_token_hash: zod.string(),
  user_agent: zod.string().nullable(),
  ip_address: zod.string().nullable(),
  created_at: zod.date(),
  updated_at: zod.date(),
});

export type UserSession = zod.infer<typeof UserSessionSchema>;
