import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const AnswerSchema = zod.object({
  id: zod.number(),
  label: zod.string().openapi({ example: "Le Grand Restaurant" }),
  image: zod.string().nullable(),
  question_id: zod.number().int().positive(),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("Answer", AnswerSchema);

export const CreateAnswerPayloadSchema = zod.object({
  label: zod.string().min(1).openapi({ example: "Le Grand Restaurant" }),
  image: zod.string().optional(),
  question_id: zod.number().int().positive().openapi({ example: 1 }),
});
registry.register("CreateAnswerPayload", CreateAnswerPayloadSchema);

export const UpdateAnswerPayloadSchema = CreateAnswerPayloadSchema.partial();
registry.register("UpdateAnswerPayload", UpdateAnswerPayloadSchema);

export type Answer = zod.infer<typeof AnswerSchema>;
export type CreateAnswerPayload = zod.infer<typeof CreateAnswerPayloadSchema>;
export type UpdateAnswerPayload = zod.infer<typeof UpdateAnswerPayloadSchema>;
