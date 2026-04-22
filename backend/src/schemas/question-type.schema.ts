import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const QuestionTypeSchema = zod.object({
  id: zod.number(),
  label: zod.string().openapi({ example: "qcm" }),
  created_at: zod.date(),
  updated_at: zod.date(),
});
registry.register("QuestionType", QuestionTypeSchema);

export const CreateQuestionTypePayloadSchema = zod.object({
  label: zod.string().min(1).openapi({ example: "QCM" }),
});
registry.register("CreateQuestionTypePayload", CreateQuestionTypePayloadSchema);

export const UpdateQuestionTypePayloadSchema =
  CreateQuestionTypePayloadSchema.partial();
registry.register("UpdateQuestionTypePayload", UpdateQuestionTypePayloadSchema);

export type QuestionType = zod.infer<typeof QuestionTypeSchema>;
export type CreateQuestionTypePayload = zod.infer<
  typeof CreateQuestionTypePayloadSchema
>;
export type UpdateQuestionTypePayload = zod.infer<
  typeof UpdateQuestionTypePayloadSchema
>;
