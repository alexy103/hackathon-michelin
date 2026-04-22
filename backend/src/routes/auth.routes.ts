import { Router } from "express";
import { validateSchema } from "../middlewares";
import { requireAuth } from "../middlewares/auth.middleware";
import { login, logout, refreshToken, register } from "../controllers";
import { LoginPayloadSchema, RegisterPayloadSchema } from "../schemas";

export const authRouter: Router = Router();

authRouter.post("/register", validateSchema(RegisterPayloadSchema), register);

authRouter.post("/login", validateSchema(LoginPayloadSchema), login);

authRouter.post("/refresh", refreshToken);

authRouter.post("/logout", requireAuth(), logout);
