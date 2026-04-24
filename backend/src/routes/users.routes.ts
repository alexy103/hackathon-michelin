import { Router } from "express";
import { requireAuth, requireApiKey, validateSchema } from "../middlewares";
import { createUser, deleteUser, getUserById, getUsers, toggleUserActivation, updateUser } from "../controllers";
import { UpdateUserPayloadSchema, CreateUserPayloadSchema } from "../schemas";

export const usersRouter: Router = Router();

usersRouter.get("/", requireApiKey, requireAuth("admin"), getUsers);

usersRouter.get("/:userId", requireApiKey, requireAuth("admin"), getUserById);

usersRouter.post("/", requireApiKey, requireAuth("admin"), validateSchema(CreateUserPayloadSchema), createUser);

usersRouter.put("/:userId", requireApiKey, requireAuth("admin"), validateSchema(UpdateUserPayloadSchema), updateUser);

usersRouter.patch("/:userId/active", requireApiKey, requireAuth("admin"), toggleUserActivation);

usersRouter.delete("/:userId", requireApiKey, requireAuth("admin"), deleteUser);
