import { Router } from "express";
import { requireAuth, requireApiKey } from "../middlewares";
import { addBadgeToAnswer, getBadgesForAnswer, removeBadgeFromAnswer } from "../controllers";

export const answerBadgeRouter: Router = Router();

answerBadgeRouter.get("/:answerId/badges", requireApiKey, getBadgesForAnswer);

answerBadgeRouter.post("/:answerId/badges", requireApiKey, requireAuth("admin"), addBadgeToAnswer);

answerBadgeRouter.delete("/:answerId/badges/:badgeId", requireApiKey, requireAuth("admin"), removeBadgeFromAnswer);
