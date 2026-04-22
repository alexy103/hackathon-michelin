import { Router } from "express";
import { requireAuth } from "../middlewares";
import { addBadgeToAnswer, getBadgesForAnswer, removeBadgeFromAnswer } from "../controllers";

export const answerBadgeRouter: Router = Router();

answerBadgeRouter.get("/:answerId/badges", requireAuth(), getBadgesForAnswer);

answerBadgeRouter.post("/:answerId/badges", requireAuth("admin"), addBadgeToAnswer);

answerBadgeRouter.delete("/:answerId/badges/:badgeId", requireAuth("admin"), removeBadgeFromAnswer);
