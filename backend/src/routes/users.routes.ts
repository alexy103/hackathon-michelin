import { Router } from "express";
import { requireAuth, validateSchema } from "../middlewares";
import { createUser, deleteUser, getUserById, getUsers, toggleUserActivation, updateUser } from "../controllers";
import { UpdateUserPayloadSchema, CreateUserPayloadSchema } from "../schemas";

export const usersRouter: Router = Router();

usersRouter.get("/", requireAuth("admin"), getUsers);

usersRouter.get("/:userId", requireAuth("admin"), getUserById);

usersRouter.post("/", requireAuth("admin"), validateSchema(CreateUserPayloadSchema), createUser);

usersRouter.put("/:userId", requireAuth("admin"), validateSchema(UpdateUserPayloadSchema), updateUser);

usersRouter.patch("/:userId/active", requireAuth("admin"), toggleUserActivation);

usersRouter.delete("/:userId", requireAuth("admin"), deleteUser);
