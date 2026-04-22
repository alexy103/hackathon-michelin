import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Role } from "../schemas";
import { rolesService } from "../services";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles: Role[] = await rolesService.getAll();
    return ApiResponse.success(res, roles);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId;
    if (!roleId) return ApiResponse.badRequest(res, "Role ID is required");

    const role: Role = await rolesService.getById(Number(roleId));
    return ApiResponse.success(res, role);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
