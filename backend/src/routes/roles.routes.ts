import { Router } from "express";
import { requireAuth, requireApiKey } from "../middlewares";
import { getRoleById, getRoles } from "../controllers";

export const rolesRouter: Router = Router();

rolesRouter.get("/", requireApiKey, requireAuth("admin"), getRoles);

rolesRouter.get("/:roleId", requireApiKey, requireAuth("admin"), getRoleById);
