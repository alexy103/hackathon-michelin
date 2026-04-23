import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import { createBadge, deleteBadge, getBadgeById, getBadges, updateBadge } from "../controllers";
import { CreateBadgePayloadSchema, UpdateBadgePayloadSchema } from "../schemas";

export const badgeRouter: Router = Router();

badgeRouter.get("/", requireAuth("admin"), getBadges);

badgeRouter.get("/:badgeId", requireAuth("admin"), getBadgeById);

badgeRouter.post("/", requireAuth("admin"), validateSchema(CreateBadgePayloadSchema), createBadge);

badgeRouter.put("/:badgeId", requireAuth("admin"), validateSchema(UpdateBadgePayloadSchema), updateBadge);

badgeRouter.delete("/:badgeId", requireAuth("admin"), deleteBadge);
