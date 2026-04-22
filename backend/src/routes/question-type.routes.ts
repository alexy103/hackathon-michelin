import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import {
  createQuestionType,
  deleteQuestionType,
  getQuestionTypeById,
  getQuestionTypes,
  updateQuestionType,
} from "../controllers";
import { CreateQuestionTypePayloadSchema, UpdateQuestionTypePayloadSchema } from "../schemas";

export const questionTypeRouter: Router = Router();

questionTypeRouter.get("/", requireAuth(), getQuestionTypes);

questionTypeRouter.get("/:typeId", requireAuth(), getQuestionTypeById);

questionTypeRouter.post("/", requireAuth("admin"), validateSchema(CreateQuestionTypePayloadSchema), createQuestionType);

questionTypeRouter.put("/:typeId", requireAuth("admin"), validateSchema(UpdateQuestionTypePayloadSchema), updateQuestionType);

questionTypeRouter.delete("/:typeId", requireAuth("admin"), deleteQuestionType);
