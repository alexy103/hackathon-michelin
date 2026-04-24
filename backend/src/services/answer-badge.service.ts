import {
  answerBadgeRepository,
  answerRepository,
  badgeRepository,
} from "../repositories";
import { Badge } from "../schemas";

export const answerBadgeService = {
  async getBadgesForAnswer(answerId: number): Promise<Badge[]> {
    await answerRepository.findById(answerId);
    return answerBadgeRepository.findByAnswer(answerId);
  },

  async addBadge(answerId: number, badgeId: number): Promise<Badge> {
    await answerRepository.findById(answerId);
    await badgeRepository.findById(badgeId);
    return answerBadgeRepository.addBadge(answerId, badgeId);
  },

  async removeBadge(answerId: number, badgeId: number): Promise<Badge> {
    await answerRepository.findById(answerId);
    await badgeRepository.findById(badgeId);
    return answerBadgeRepository.removeBadge(answerId, badgeId);
  },
};
