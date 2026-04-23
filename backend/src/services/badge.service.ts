import { AppError } from "../types";
import { badgeRepository } from "../repositories";
import { Badge, CreateBadgePayload, UpdateBadgePayload } from "../schemas";

export const badgeService = {
  async getAll(): Promise<Badge[]> {
    return badgeRepository.findAll();
  },

  async getById(id: number): Promise<Badge> {
    return badgeRepository.findById(id);
  },

  async create(data: CreateBadgePayload): Promise<Badge> {
    const existing = await badgeRepository.findByLabel(data.label);
    if (existing) throw new AppError("Badge already exists", 409);
    return badgeRepository.create(data);
  },

  async update(id: number, data: UpdateBadgePayload): Promise<Badge> {
    await badgeRepository.findById(id);
    if (data.label) {
      const existing = await badgeRepository.findByLabel(data.label);
      if (existing && existing.id !== id) throw new AppError("Badge already exists", 409);
    }
    return badgeRepository.update(id, data);
  },

  async delete(id: number): Promise<Badge> {
    await badgeRepository.findById(id);
    return badgeRepository.delete(id);
  },
};
