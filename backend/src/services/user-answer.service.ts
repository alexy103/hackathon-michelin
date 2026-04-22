import { userAnswerRepository, answerRepository, usersRepository } from "../repositories";
import { UserAnswer } from "../schemas";

export const userAnswerService = {
  async getByUser(userId: number): Promise<UserAnswer[]> {
    await usersRepository.findById(userId);
    return userAnswerRepository.findByUser(userId);
  },

  async create(userId: number, answerId: number): Promise<UserAnswer> {
    await usersRepository.findById(userId);
    await answerRepository.findById(answerId);
    return userAnswerRepository.create(userId, answerId);
  },

  async deleteByUser(userId: number): Promise<void> {
    await usersRepository.findById(userId);
    return userAnswerRepository.deleteByUser(userId);
  },
};
