import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import { createActivity, deleteActivity, getActivities, getActivityById, updateActivity } from "../controllers";
import { CreateActivityPayloadSchema, UpdateActivityPayloadSchema } from "../schemas";

export const activityRouter: Router = Router();

activityRouter.get("/", requireAuth("admin"), getActivities);

activityRouter.get("/:activityId", requireAuth("admin"), getActivityById);

activityRouter.post("/", requireAuth("admin"), validateSchema(CreateActivityPayloadSchema), createActivity);

activityRouter.put("/:activityId", requireAuth("admin"), validateSchema(UpdateActivityPayloadSchema), updateActivity);

activityRouter.delete("/:activityId", requireAuth("admin"), deleteActivity);
