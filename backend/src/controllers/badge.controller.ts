import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Badge } from "../schemas";
import { badgeService } from "../services";

export const getBadges = async (req: Request, res: Response) => {
  try {
    const badges: Badge[] = await badgeService.getAll();
    return ApiResponse.success(res, badges);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getBadgeById = async (req: Request, res: Response) => {
  try {
    const badgeId = req.params.badgeId;
    if (!badgeId) return ApiResponse.badRequest(res, "Badge ID is required");

    const badge: Badge = await badgeService.getById(Number(badgeId));
    return ApiResponse.success(res, badge);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createBadge = async (req: Request, res: Response) => {
  try {
    const badge: Badge = await badgeService.create(req.body);
    return ApiResponse.success(res, badge, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateBadge = async (req: Request, res: Response) => {
  try {
    const badgeId = req.params.badgeId;
    if (!badgeId) return ApiResponse.badRequest(res, "Badge ID is required");

    const badge: Badge = await badgeService.update(Number(badgeId), req.body);
    return ApiResponse.success(res, badge);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteBadge = async (req: Request, res: Response) => {
  try {
    const badgeId = req.params.badgeId;
    if (!badgeId) return ApiResponse.badRequest(res, "Badge ID is required");

    const badge: Badge = await badgeService.delete(Number(badgeId));
    return ApiResponse.success(res, badge);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
