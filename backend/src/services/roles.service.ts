import { AppError } from "../types";
import { rolesRepository } from "../repositories";
import { Role } from "../schemas";

export const rolesService = {
  async getAll(): Promise<Role[]> {
    return rolesRepository.findAll();
  },

  async getById(id: number): Promise<Role> {
    return rolesRepository.findById(id);
  },
};
