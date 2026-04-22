import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const QuestionSchema = zod.object({
  id: zod.number(),
  label: zod.string().openapi({ example: "What is the best restaurant?" }),
  image: zod.string().nullable(),
  timer: zod.number().int().nullable(),
  question_type_id: zod.number().int().positive(),
  step_id: zod.number().int().positive(),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("Question", QuestionSchema);

export const CreateQuestionPayloadSchema = zod.object({
  label: zod.string().min(1).openapi({ example: "What is the best restaurant?" }),
  image: zod.string().optional(),
  timer: zod.number().int().optional(),
  question_type_id: zod.number().int().positive().openapi({ example: 1 }),
  step_id: zod.number().int().positive().openapi({ example: 1 }),
});
registry.register("CreateQuestionPayload", CreateQuestionPayloadSchema);

export const UpdateQuestionPayloadSchema = CreateQuestionPayloadSchema.partial();
registry.register("UpdateQuestionPayload", UpdateQuestionPayloadSchema);

export type Question = zod.infer<typeof QuestionSchema>;
export type CreateQuestionPayload = zod.infer<typeof CreateQuestionPayloadSchema>;
export type UpdateQuestionPayload = zod.infer<typeof UpdateQuestionPayloadSchema>;
