import { UpdateUserPayload, CreateUserPayload, User } from "../schemas";
import { AppError } from "../types";
import { usersRepository } from "../repositories";
import { capitalize, capitalizeFirst, hashPassword, minimize } from "../utils";

export const userService = {
  async getAll(isActivated: string): Promise<User[]> {
    return usersRepository.findAll(isActivated);
  },

  async getById(id: number): Promise<User> {
    return usersRepository.findById(id);
  },

  async create(data: CreateUserPayload): Promise<User> {
    data = {
      ...data,
      email: minimize(data.email),
      last_name: capitalize(data.last_name),
      first_name: capitalizeFirst(data.first_name),
    };

    const emailExists: User | null = await usersRepository.findByEmail(data.email);
    if (emailExists) throw new AppError("Email already exists", 409);

    const passwordHash: string = await hashPassword(data.email);
    if (!passwordHash) throw new AppError("Internal Server Error", 500);

    return usersRepository.create(data, passwordHash);
  },

  async update(userId: number, data: UpdateUserPayload): Promise<User> {
    if (data.email) data.email = minimize(data.email);
    if (data.last_name) data.last_name = capitalize(data.last_name);
    if (data.first_name) data.first_name = capitalizeFirst(data.first_name);

    const existingUser: User = await usersRepository.findById(userId);
    if (!existingUser) throw new AppError("User not found", 404);

    if (data.email && data.email !== existingUser.email) {
      const emailExists: User | null = await usersRepository.findByEmail(data.email);
      if (emailExists) throw new AppError("Email already exists", 409);
    }

    return usersRepository.update(userId, data);
  },

  async setActivation(userId: number, isActivated: boolean): Promise<User> {
    const existingUser: User = await usersRepository.findById(userId);
    if (!existingUser) throw new AppError("User not found", 404);

    if (existingUser.is_activated === isActivated) {
      throw new AppError(isActivated ? "User already activated" : "User already deactivated", 409);
    }

    return usersRepository.updateActivation(userId, isActivated);
  },

  async delete(userId: number): Promise<User> {
    const existingUser: User = await usersRepository.findById(userId);
    if (!existingUser) throw new AppError("User not found", 404);

    return usersRepository.delete(userId);
  },
};
