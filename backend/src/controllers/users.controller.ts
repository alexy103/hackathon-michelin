import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { User } from "../schemas";
import { userService } from "../services";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const isActivated: string = String(req.query.active);
    const users: User[] = await userService.getAll(isActivated);
    return ApiResponse.success(res, users);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return ApiResponse.badRequest(res, "User ID is required");

    const user: User = await userService.getById(Number(userId));
    return ApiResponse.success(res, user);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = await userService.create(req.body);
    return ApiResponse.success(res, user, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return ApiResponse.badRequest(res, "User ID is required");

    const user: User = await userService.update(Number(userId), req.body);
    return ApiResponse.success(res, user);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const toggleUserActivation = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { isActivated } = req.body;
    if (!userId || isActivated === undefined) {
      return ApiResponse.badRequest(res, "User ID and isActivated are required");
    }

    const user: User = await userService.setActivation(Number(userId), isActivated);
    return ApiResponse.success(res, user);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) return ApiResponse.badRequest(res, "User ID is required");

    const user: User = await userService.delete(Number(userId));
    return ApiResponse.success(res, user);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
