import { Router } from "express";
import { requireAuth } from "../middlewares";
import { createUserAnswer, deleteUserAnswers, getMyAnswers } from "../controllers";

export const userAnswerRouter: Router = Router();

userAnswerRouter.get("/me", requireAuth(), getMyAnswers);

userAnswerRouter.post("/", requireAuth(), createUserAnswer);

userAnswerRouter.delete("/", requireAuth("admin"), deleteUserAnswers);
