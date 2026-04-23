import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import { createAnswer, deleteAnswer, getAnswerById, getAnswers, getAnswersByQuestion, updateAnswer } from "../controllers";
import { CreateAnswerPayloadSchema, UpdateAnswerPayloadSchema } from "../schemas";

export const answerRouter: Router = Router();

answerRouter.get("/", requireAuth(), getAnswers);

answerRouter.get("/question/:questionId", requireAuth(), getAnswersByQuestion);

answerRouter.get("/:answerId", requireAuth(), getAnswerById);

answerRouter.post("/", requireAuth("admin"), validateSchema(CreateAnswerPayloadSchema), createAnswer);

answerRouter.put("/:answerId", requireAuth("admin"), validateSchema(UpdateAnswerPayloadSchema), updateAnswer);

answerRouter.delete("/:answerId", requireAuth("admin"), deleteAnswer);
