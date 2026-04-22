import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const UserAnswerSchema = zod.object({
  user_id: zod.number().int().positive(),
  answer_id: zod.number().int().positive(),
  date: zod.string().openapi({ example: "2026-04-21" }),
});
registry.register("UserAnswer", UserAnswerSchema);

export type UserAnswer = zod.infer<typeof UserAnswerSchema>;
