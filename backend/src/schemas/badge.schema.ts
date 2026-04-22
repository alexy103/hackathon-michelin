import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const BadgeSchema = zod.object({
  id: zod.number(),
  label: zod.string().openapi({ example: "Gourmet" }),
  image: zod.string().nullable(),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("Badge", BadgeSchema);

export const CreateBadgePayloadSchema = zod.object({
  label: zod.string().min(1).openapi({ example: "Gourmet" }),
  image: zod.string().optional(),
});
registry.register("CreateBadgePayload", CreateBadgePayloadSchema);

export const UpdateBadgePayloadSchema = CreateBadgePayloadSchema.partial();
registry.register("UpdateBadgePayload", UpdateBadgePayloadSchema);

export type Badge = zod.infer<typeof BadgeSchema>;
export type CreateBadgePayload = zod.infer<typeof CreateBadgePayloadSchema>;
export type UpdateBadgePayload = zod.infer<typeof UpdateBadgePayloadSchema>;
