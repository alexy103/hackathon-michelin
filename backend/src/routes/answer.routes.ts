import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import { createAnswer, deleteAnswer, getAnswerById, getAnswers, getAnswersByQuestion, updateAnswer } from "../controllers";
import { CreateAnswerPayloadSchema, UpdateAnswerPayloadSchema } from "../schemas";

export const answerRouter: Router = Router();

answerRouter.get("/", requireApiKey, getAnswers);

answerRouter.get("/question/:questionId", requireApiKey, getAnswersByQuestion);

answerRouter.get("/:answerId", requireApiKey, getAnswerById);

answerRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateAnswerPayloadSchema), createAnswer);

answerRouter.put("/:answerId", requireApiKey, requireAuth("admin"), validateSchema(UpdateAnswerPayloadSchema), updateAnswer);

answerRouter.delete("/:answerId", requireApiKey, requireAuth("admin"), deleteAnswer);
