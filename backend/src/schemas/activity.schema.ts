import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const ActivitySchema = zod.object({
  id: zod.number(),
  label: zod.string().openapi({ example: "Le Petit Bistro" }),
  image: zod.string().nullable(),
  type: zod.enum(["Restaurant", "Hôtel"]).openapi({ example: "Restaurant" }),
  badge_id: zod.number().int().positive(),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("Activity", ActivitySchema);

export const CreateActivityPayloadSchema = zod.object({
  label: zod.string().min(1).openapi({ example: "Le Petit Bistro" }),
  image: zod.string().optional(),
  type: zod.enum(["Restaurant", "Hôtel"]).openapi({ example: "Restaurant" }),
  badge_id: zod.number().int().positive().openapi({ example: 1 }),
});
registry.register("CreateActivityPayload", CreateActivityPayloadSchema);

export const UpdateActivityPayloadSchema = CreateActivityPayloadSchema.partial();
registry.register("UpdateActivityPayload", UpdateActivityPayloadSchema);

export type Activity = zod.infer<typeof ActivitySchema>;
export type CreateActivityPayload = zod.infer<typeof CreateActivityPayloadSchema>;
export type UpdateActivityPayload = zod.infer<typeof UpdateActivityPayloadSchema>;
