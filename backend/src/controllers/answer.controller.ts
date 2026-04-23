import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Answer } from "../schemas";
import { answerService } from "../services";

export const getAnswers = async (req: Request, res: Response) => {
  try {
    const answers: Answer[] = await answerService.getAll();
    return ApiResponse.success(res, answers);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const answerId = req.params.answerId;
    if (!answerId) return ApiResponse.badRequest(res, "Answer ID is required");

    const answer: Answer = await answerService.getById(Number(answerId));
    return ApiResponse.success(res, answer);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const getAnswersByQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.questionId;
    if (!questionId) return ApiResponse.badRequest(res, "Question ID is required");

    const answers: Answer[] = await answerService.getByQuestion(Number(questionId));
    return ApiResponse.success(res, answers);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const answer: Answer = await answerService.create(req.body);
    return ApiResponse.success(res, answer, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const answerId = req.params.answerId;
    if (!answerId) return ApiResponse.badRequest(res, "Answer ID is required");

    const answer: Answer = await answerService.update(Number(answerId), req.body);
    return ApiResponse.success(res, answer);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const answerId = req.params.answerId;
    if (!answerId) return ApiResponse.badRequest(res, "Answer ID is required");

    const answer: Answer = await answerService.delete(Number(answerId));
    return ApiResponse.success(res, answer);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
