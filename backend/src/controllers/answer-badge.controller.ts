import { Request, Response } from "express";
import ApiResponse from "../utils/api-responses.utils";
import { Badge } from "../schemas";
import { answerBadgeService } from "../services";

export const getBadgesForAnswer = async (req: Request, res: Response) => {
  try {
    const answerId = req.params.answerId;
    if (!answerId) return ApiResponse.badRequest(res, "Answer ID is required");

    const badges: Badge[] = await answerBadgeService.getBadgesForAnswer(Number(answerId));
    return ApiResponse.success(res, badges);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const addBadgeToAnswer = async (req: Request, res: Response) => {
  try {
    const answerId = req.params.answerId;
    const { badgeId } = req.body;
    if (!answerId || !badgeId) return ApiResponse.badRequest(res, "Answer ID and Badge ID are required");

    const badge: Badge = await answerBadgeService.addBadge(Number(answerId), Number(badgeId));
    return ApiResponse.success(res, badge, 201);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};

export const removeBadgeFromAnswer = async (req: Request, res: Response) => {
  try {
    const answerId = req.params.answerId;
    const badgeId = req.params.badgeId;
    if (!answerId || !badgeId) return ApiResponse.badRequest(res, "Answer ID and Badge ID are required");

    const badge: Badge = await answerBadgeService.removeBadge(Number(answerId), Number(badgeId));
    return ApiResponse.success(res, badge);
  } catch (error) {
    return ApiResponse.getError(res, error);
  }
};
