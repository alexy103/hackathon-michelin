import { AppError } from "../types";
import {
  stepRepository,
  questionRepository,
  questionTypeRepository,
} from "../repositories";
import {
  Question,
  CreateQuestionPayload,
  UpdateQuestionPayload,
} from "../schemas";

export const questionService = {
  async getAll(): Promise<Question[]> {
    return questionRepository.findAll();
  },

  async getById(id: number): Promise<Question> {
    return questionRepository.findById(id);
  },

  async getByStep(stepId: number): Promise<Question[]> {
    return questionRepository.findByStep(stepId);
  },

  async create(data: CreateQuestionPayload): Promise<Question> {
    const existing = await questionRepository.findByLabel(data.label);
    if (existing) throw new AppError("Question already exists", 409);

    await stepRepository.findById(data.step_id);
    await questionTypeRepository.findById(data.question_type_id);

    return questionRepository.create(data);
  },

  async update(id: number, data: UpdateQuestionPayload): Promise<Question> {
    await questionRepository.findById(id);

    if (data.step_id) await stepRepository.findById(data.step_id);
    if (data.question_type_id)
      await questionTypeRepository.findById(data.question_type_id);

    return questionRepository.update(id, data);
  },

  async countByStep(stepId: number): Promise<number> {
    await stepRepository.findById(stepId);
    return questionRepository.countByStep(stepId);
  },

  async countAll(): Promise<number> {
    return questionRepository.countQuestion();
  },

  async delete(id: number): Promise<Question> {
    await questionRepository.findById(id);
    return questionRepository.delete(id);
  },
};
