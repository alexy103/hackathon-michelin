import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import { createBadge, deleteBadge, getBadgeById, getBadges, updateBadge } from "../controllers";
import { CreateBadgePayloadSchema, UpdateBadgePayloadSchema } from "../schemas";

export const badgeRouter: Router = Router();

badgeRouter.get("/", requireApiKey, getBadges);

badgeRouter.get("/:badgeId", requireApiKey, getBadgeById);

badgeRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateBadgePayloadSchema), createBadge);

badgeRouter.put("/:badgeId", requireApiKey, requireAuth("admin"), validateSchema(UpdateBadgePayloadSchema), updateBadge);

badgeRouter.delete("/:badgeId", requireApiKey, requireAuth("admin"), deleteBadge);
