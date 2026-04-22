import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { UserAnswer } from "../schemas";
import { userAnswerService } from "../services";
import { AuthenticatedRequest } from "../types";

export const getMyAnswers = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    const userAnswers: UserAnswer[] = await userAnswerService.getByUser(userId);
    return ApiResponse.success(res, userAnswers);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createUserAnswer = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    const { answerId } = req.body;
    if (!answerId) return ApiResponse.badRequest(res, "Answer ID is required");

    const userAnswer: UserAnswer = await userAnswerService.create(userId, Number(answerId));
    return ApiResponse.success(res, userAnswer, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteUserAnswers = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    await userAnswerService.deleteByUser(userId);
    return ApiResponse.success(res, null);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
