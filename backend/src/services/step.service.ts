import { AppError } from "../types";
import { stepRepository } from "../repositories";
import { Step, CreateStepPayload, UpdateStepPayload } from "../schemas";

export const stepService = {
  async getAll(): Promise<Step[]> {
    return stepRepository.findAll();
  },

  async getById(id: number): Promise<Step> {
    return stepRepository.findById(id);
  },

  async create(data: CreateStepPayload): Promise<Step> {
    const existing = await stepRepository.findByLabel(data.label);
    if (existing) throw new AppError("Step already exists", 409);
    return stepRepository.create(data);
  },

  async update(id: number, data: UpdateStepPayload): Promise<Step> {
    await stepRepository.findById(id);
    if (data.label) {
      const existing = await stepRepository.findByLabel(data.label);
      if (existing && existing.id !== id) throw new AppError("Step already exists", 409);
    }
    return stepRepository.update(id, data);
  },

  async delete(id: number): Promise<Step> {
    await stepRepository.findById(id);
    return stepRepository.delete(id);
  },
};
