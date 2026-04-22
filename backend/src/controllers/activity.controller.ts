import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Activity } from "../schemas";
import { activityService } from "../services";

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities: Activity[] = await activityService.getAll();
    return ApiResponse.success(res, activities);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.activityId;
    if (!activityId) return ApiResponse.badRequest(res, "Activity ID is required");

    const activity: Activity = await activityService.getById(Number(activityId));
    return ApiResponse.success(res, activity);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const activity: Activity = await activityService.create(req.body);
    return ApiResponse.success(res, activity, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.activityId;
    if (!activityId) return ApiResponse.badRequest(res, "Activity ID is required");

    const activity: Activity = await activityService.update(Number(activityId), req.body);
    return ApiResponse.success(res, activity);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activityId = req.params.activityId;
    if (!activityId) return ApiResponse.badRequest(res, "Activity ID is required");

    const activity: Activity = await activityService.delete(Number(activityId));
    return ApiResponse.success(res, activity);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
