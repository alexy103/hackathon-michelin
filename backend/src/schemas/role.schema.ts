import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const RoleSchema = zod.object({
  id: zod.number(),
  label: zod.string().openapi({ example: "admin" }),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("Role", RoleSchema);

export type Role = zod.infer<typeof RoleSchema>;
