import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import { createStep, deleteStep, getStepById, getSteps, updateStep } from "../controllers";
import { CreateStepPayloadSchema, UpdateStepPayloadSchema } from "../schemas";

export const stepRouter: Router = Router();

stepRouter.get("/", requireAuth(), getSteps);

stepRouter.get("/:stepId", requireAuth(), getStepById);

stepRouter.post("/", requireAuth("admin"), validateSchema(CreateStepPayloadSchema), createStep);

stepRouter.put("/:stepId", requireAuth("admin"), validateSchema(UpdateStepPayloadSchema), updateStep);

stepRouter.delete("/:stepId", requireAuth("admin"), deleteStep);
