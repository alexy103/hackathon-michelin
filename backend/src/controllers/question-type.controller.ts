import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { questionTypeService } from "../services";

export const getQuestionTypes = async (req: Request, res: Response) => {
  try {
    const types = await questionTypeService.getAll();
    return ApiResponse.success(res, types);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getQuestionTypeById = async (req: Request, res: Response) => {
  try {
    const { typeId } = req.params;
    const type = await questionTypeService.getById(Number(typeId));
    return ApiResponse.success(res, type);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createQuestionType = async (req: Request, res: Response) => {
  try {
    const type = await questionTypeService.create(req.body);
    return ApiResponse.success(res, type, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateQuestionType = async (req: Request, res: Response) => {
  try {
    const { typeId } = req.params;
    const type = await questionTypeService.update(Number(typeId), req.body);
    return ApiResponse.success(res, type);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteQuestionType = async (req: Request, res: Response) => {
  try {
    const { typeId } = req.params;
    const type = await questionTypeService.delete(Number(typeId));
    return ApiResponse.success(res, type);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
