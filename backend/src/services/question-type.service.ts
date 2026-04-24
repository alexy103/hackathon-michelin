import { questionTypeRepository } from "../repositories";
import {
  CreateQuestionTypePayload,
  QuestionType,
  UpdateQuestionTypePayload,
} from "../schemas";
import { AppError } from "../types";

export const questionTypeService = {
  async getAll(): Promise<QuestionType[]> {
    return questionTypeRepository.findAll();
  },

  async getById(id: number): Promise<QuestionType> {
    return questionTypeRepository.findById(id);
  },

  async create(data: CreateQuestionTypePayload): Promise<QuestionType> {
    const existing = await questionTypeRepository.findByLabel(data.label);
    if (existing) throw new AppError("Question type already exists", 409);
    return questionTypeRepository.create(data);
  },

  async update(id: number, data: UpdateQuestionTypePayload): Promise<QuestionType> {
    await questionTypeRepository.findById(id);
    if (data.label) {
      const existing = await questionTypeRepository.findByLabel(data.label);
      if (existing && existing.id !== id) throw new AppError("Question type already exists", 409);
    }
    return questionTypeRepository.update(id, data);
  },

  async delete(id: number): Promise<QuestionType> {
    await questionTypeRepository.findById(id);
    return questionTypeRepository.delete(id);
  },
};
