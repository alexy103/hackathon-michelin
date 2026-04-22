import { Router } from "express";
import { requireAuth } from "../middlewares";
import { getRoleById, getRoles } from "../controllers";

export const rolesRouter: Router = Router();

rolesRouter.get("/", requireAuth("admin"), getRoles);

rolesRouter.get("/:roleId", requireAuth("admin"), getRoleById);
