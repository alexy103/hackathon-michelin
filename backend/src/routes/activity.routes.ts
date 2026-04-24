import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import { createActivity, deleteActivity, getActivities, getActivityById, updateActivity } from "../controllers";
import { CreateActivityPayloadSchema, UpdateActivityPayloadSchema } from "../schemas";

export const activityRouter: Router = Router();

activityRouter.get("/", requireApiKey, getActivities);

activityRouter.get("/:activityId", requireApiKey, getActivityById);

activityRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateActivityPayloadSchema), createActivity);

activityRouter.put("/:activityId", requireApiKey, requireAuth("admin"), validateSchema(UpdateActivityPayloadSchema), updateActivity);

activityRouter.delete("/:activityId", requireApiKey, requireAuth("admin"), deleteActivity);
