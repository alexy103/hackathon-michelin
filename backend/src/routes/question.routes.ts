import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import { createQuestion, deleteQuestion, getQuestionById, getQuestions, getQuestionsByStep, updateQuestion, countQuestionsByStep, countAllQuestions } from "../controllers";
import { CreateQuestionPayloadSchema, UpdateQuestionPayloadSchema } from "../schemas";

export const questionRouter: Router = Router();

questionRouter.get("/", requireAuth(), getQuestions);

questionRouter.get("/count", requireAuth(), countAllQuestions);

questionRouter.get("/step/:stepId", requireAuth(), getQuestionsByStep);

questionRouter.get("/step/:stepId/count", requireAuth(), countQuestionsByStep);

questionRouter.get("/:questionId", requireAuth(), getQuestionById);

questionRouter.post("/", requireAuth("admin"), validateSchema(CreateQuestionPayloadSchema), createQuestion);

questionRouter.put("/:questionId", requireAuth("admin"), validateSchema(UpdateQuestionPayloadSchema), updateQuestion);

questionRouter.delete("/:questionId", requireAuth("admin"), deleteQuestion);
