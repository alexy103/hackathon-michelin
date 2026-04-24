import { Router } from "express";
import { validateSchema, requireApiKey } from "../middlewares";
import { requireAuth } from "../middlewares/auth.middleware";
import { login, logout, refreshToken, register } from "../controllers";
import { LoginPayloadSchema, RegisterPayloadSchema } from "../schemas";

export const authRouter: Router = Router();

authRouter.post("/register", requireApiKey, validateSchema(RegisterPayloadSchema), register);

authRouter.post("/login", requireApiKey, validateSchema(LoginPayloadSchema), login);

authRouter.post("/refresh", requireApiKey, refreshToken);

authRouter.post("/logout", requireApiKey, requireAuth(), logout);
