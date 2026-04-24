import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import { createQuestion, deleteQuestion, getQuestionById, getQuestions, getQuestionsByStep, updateQuestion, countQuestionsByStep, countAllQuestions } from "../controllers";
import { CreateQuestionPayloadSchema, UpdateQuestionPayloadSchema } from "../schemas";

export const questionRouter: Router = Router();

questionRouter.get("/", requireApiKey, getQuestions);

questionRouter.get("/count", requireApiKey, countAllQuestions);

questionRouter.get("/step/:stepId", requireApiKey, getQuestionsByStep);

questionRouter.get("/step/:stepId/count", requireApiKey, countQuestionsByStep);

questionRouter.get("/:questionId", requireApiKey, getQuestionById);

questionRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateQuestionPayloadSchema), createQuestion);

questionRouter.put("/:questionId", requireApiKey, requireAuth("admin"), validateSchema(UpdateQuestionPayloadSchema), updateQuestion);

questionRouter.delete("/:questionId", requireApiKey, requireAuth("admin"), deleteQuestion);
