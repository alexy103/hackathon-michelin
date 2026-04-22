import { AppError } from "../types";
import { answerRepository, questionRepository } from "../repositories";
import { Answer, CreateAnswerPayload, UpdateAnswerPayload } from "../schemas";

export const answerService = {
  async getAll(): Promise<Answer[]> {
    return answerRepository.findAll();
  },

  async getById(id: number): Promise<Answer> {
    return answerRepository.findById(id);
  },

  async getByQuestion(questionId: number): Promise<Answer[]> {
    return answerRepository.findByQuestion(questionId);
  },

  async create(data: CreateAnswerPayload): Promise<Answer> {
    const existing = await answerRepository.findByLabel(data.label);
    if (existing) throw new AppError("Answer already exists", 409);

    await questionRepository.findById(data.question_id);

    return answerRepository.create(data);
  },

  async update(id: number, data: UpdateAnswerPayload): Promise<Answer> {
    await answerRepository.findById(id);
    if (data.label) {
      const existing = await answerRepository.findByLabel(data.label);
      if (existing && existing.id !== id)
        throw new AppError("Answer already exists", 409);
    }
    if (data.question_id) await questionRepository.findById(data.question_id);
    return answerRepository.update(id, data);
  },

  async delete(id: number): Promise<Answer> {
    await answerRepository.findById(id);
    return answerRepository.delete(id);
  },
};
