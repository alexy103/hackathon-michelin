import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const StepSchema = zod.object({
  id: zod.number(),
  number: zod.number().int().positive().openapi({ example: 1 }),
  label: zod.string().openapi({ example: "Step 1" }),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("Step", StepSchema);

export const CreateStepPayloadSchema = zod.object({
  number: zod.number().int().positive().openapi({ example: 1 }),
  label: zod.string().min(1).openapi({ example: "Step 1" }),
});
registry.register("CreateStepPayload", CreateStepPayloadSchema);

export const UpdateStepPayloadSchema = CreateStepPayloadSchema.partial();
registry.register("UpdateStepPayload", UpdateStepPayloadSchema);

export type Step = zod.infer<typeof StepSchema>;
export type CreateStepPayload = zod.infer<typeof CreateStepPayloadSchema>;
export type UpdateStepPayload = zod.infer<typeof UpdateStepPayloadSchema>;
