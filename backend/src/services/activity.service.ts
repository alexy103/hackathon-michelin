import { AppError } from "../types";
import { activityRepository, badgeRepository } from "../repositories";
import {
  Activity,
  CreateActivityPayload,
  UpdateActivityPayload,
} from "../schemas";

export const activityService = {
  async getAll(): Promise<Activity[]> {
    return activityRepository.findAll();
  },

  async getById(id: number): Promise<Activity> {
    return activityRepository.findById(id);
  },

  async create(data: CreateActivityPayload): Promise<Activity> {
    const existing = await activityRepository.findByLabel(data.label);
    if (existing) throw new AppError("Activity already exists", 409);

    await badgeRepository.findById(data.badge_id);
    return activityRepository.create(data);
  },

  async update(id: number, data: UpdateActivityPayload): Promise<Activity> {
    await activityRepository.findById(id);
    if (data.label) {
      const existing = await activityRepository.findByLabel(data.label);
      if (existing && existing.id !== id)
        throw new AppError("Activity already exists", 409);
    }
    if (data.badge_id) await badgeRepository.findById(data.badge_id);
    return activityRepository.update(id, data);
  },

  async delete(id: number): Promise<Activity> {
    await activityRepository.findById(id);
    return activityRepository.delete(id);
  },
};
