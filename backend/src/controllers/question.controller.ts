import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Question } from "../schemas";
import { questionService } from "../services";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions: Question[] = await questionService.getAll();
    return ApiResponse.success(res, questions);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.questionId;
    if (!questionId) return ApiResponse.badRequest(res, "Question ID is required");

    const question: Question = await questionService.getById(Number(questionId));
    return ApiResponse.success(res, question);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getQuestionsByStep = async (req: Request, res: Response) => {
  try {
    const stepId = req.params.stepId;
    if (!stepId) return ApiResponse.badRequest(res, "Step ID is required");

    const questions: Question[] = await questionService.getByStep(Number(stepId));
    return ApiResponse.success(res, questions);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const countQuestionsByStep = async (req: Request, res: Response) => {
  try {
    const stepId = req.params.stepId;
    if (!stepId) return ApiResponse.badRequest(res, "Step ID is required");

    const count = await questionService.countByStep(Number(stepId));
    return ApiResponse.success(res, { count });
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const countAllQuestions = async (req: Request, res: Response) => {
  try {
    const count = await questionService.countAll();
    return ApiResponse.success(res, { count });
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question: Question = await questionService.create(req.body);
    return ApiResponse.success(res, question, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.questionId;
    if (!questionId) return ApiResponse.badRequest(res, "Question ID is required");

    const question: Question = await questionService.update(Number(questionId), req.body);
    return ApiResponse.success(res, question);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.questionId;
    if (!questionId) return ApiResponse.badRequest(res, "Question ID is required");

    const question: Question = await questionService.delete(Number(questionId));
    return ApiResponse.success(res, question);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
