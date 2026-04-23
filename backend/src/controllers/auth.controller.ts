import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { AuthenticatedRequest } from "../types";
import { authService } from "../services";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password, req);
    return ApiResponse.success(res, result);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return ApiResponse.badRequest(res, "Refresh token is required");

    const tokens = await authService.refreshToken(refreshToken);
    return ApiResponse.success(res, tokens);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    await authService.logout(userId);
    return ApiResponse.success(res, { message: "Logged out successfully" });
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body, req);
    return ApiResponse.success(res, result, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
