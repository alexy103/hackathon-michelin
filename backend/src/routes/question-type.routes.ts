import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import {
  createQuestionType,
  deleteQuestionType,
  getQuestionTypeById,
  getQuestionTypes,
  updateQuestionType,
} from "../controllers";
import { CreateQuestionTypePayloadSchema, UpdateQuestionTypePayloadSchema } from "../schemas";

export const questionTypeRouter: Router = Router();

questionTypeRouter.get("/", requireApiKey, getQuestionTypes);

questionTypeRouter.get("/:typeId", requireApiKey, getQuestionTypeById);

questionTypeRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateQuestionTypePayloadSchema), createQuestionType);

questionTypeRouter.put("/:typeId", requireApiKey, requireAuth("admin"), validateSchema(UpdateQuestionTypePayloadSchema), updateQuestionType);

questionTypeRouter.delete("/:typeId", requireApiKey, requireAuth("admin"), deleteQuestionType);
