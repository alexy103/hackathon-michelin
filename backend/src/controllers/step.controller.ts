import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Step } from "../schemas";
import { stepService } from "../services";

export const getSteps = async (req: Request, res: Response) => {
  try {
    const steps: Step[] = await stepService.getAll();
    return ApiResponse.success(res, steps);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getStepById = async (req: Request, res: Response) => {
  try {
    const stepId = req.params.stepId;
    if (!stepId) return ApiResponse.badRequest(res, "Step ID is required");

    const step: Step = await stepService.getById(Number(stepId));
    return ApiResponse.success(res, step);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createStep = async (req: Request, res: Response) => {
  try {
    const step: Step = await stepService.create(req.body);
    return ApiResponse.success(res, step, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateStep = async (req: Request, res: Response) => {
  try {
    const stepId = req.params.stepId;
    if (!stepId) return ApiResponse.badRequest(res, "Step ID is required");

    const step: Step = await stepService.update(Number(stepId), req.body);
    return ApiResponse.success(res, step);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteStep = async (req: Request, res: Response) => {
  try {
    const stepId = req.params.stepId;
    if (!stepId) return ApiResponse.badRequest(res, "Step ID is required");

    const step: Step = await stepService.delete(Number(stepId));
    return ApiResponse.success(res, step);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
