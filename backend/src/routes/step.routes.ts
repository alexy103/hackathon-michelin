import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import { createStep, deleteStep, getStepById, getSteps, updateStep } from "../controllers";
import { CreateStepPayloadSchema, UpdateStepPayloadSchema } from "../schemas";

export const stepRouter: Router = Router();

stepRouter.get("/", requireApiKey, getSteps);

stepRouter.get("/:stepId", requireApiKey, getStepById);

stepRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateStepPayloadSchema), createStep);

stepRouter.put("/:stepId", requireApiKey, requireAuth("admin"), validateSchema(UpdateStepPayloadSchema), updateStep);

stepRouter.delete("/:stepId", requireApiKey, requireAuth("admin"), deleteStep);
