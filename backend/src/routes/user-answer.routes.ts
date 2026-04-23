import { Router } from "express";
import { requireAuth, requireApiKey } from "../middlewares";
import { createUserAnswer, deleteUserAnswers, getMyAnswers } from "../controllers";

export const userAnswerRouter: Router = Router();

userAnswerRouter.get("/me", requireApiKey, requireAuth(), getMyAnswers);

userAnswerRouter.post("/", requireApiKey, requireAuth(), createUserAnswer);

userAnswerRouter.delete("/", requireApiKey, requireAuth("admin"), deleteUserAnswers);
