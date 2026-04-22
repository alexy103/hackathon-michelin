import jwt from "jsonwebtoken";
import { Request } from "express";
import { AppError } from "../types";
import {
  rolesRepository,
  sessionsRepository,
  usersRepository,
} from "../repositories";
import { RegisterPayload, User, UserSession } from "../schemas";
import {
  capitalize,
  capitalizeFirst,
  hashPassword,
  minimize,
  verifyPassword,
} from "../utils";

export const authService = {
  async login(email: string, password: string, req?: Request) {
    email = minimize(email);

    const user: User | null = await usersRepository.findByEmail(email);

    if (!user || !user.is_activated) {
      throw new AppError("Invalid credentials", 401);
    }

    const valid: boolean = await verifyPassword(password, user.password_hash);

    if (!valid) throw new AppError("Invalid credentials", 401);

    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!jwtSecret || !jwtRefreshSecret)
      throw new AppError("Server configuration error", 500);

    const accessToken: string = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "60m",
    });
    const refreshToken: string = jwt.sign(
      { userId: user.id },
      jwtRefreshSecret,
      { expiresIn: "7d" },
    );

    const session: UserSession = await sessionsRepository.create(
      user.id,
      await hashPassword(refreshToken),
      req?.headers["user-agent"] || null,
      req?.ip || null,
    );

    const role = await rolesRepository.findById(user.role_id);

    return {
      userId: user.id,
      role: role.label,
      accessToken,
      refreshToken,
      sessionId: session.id,
    };
  },

  async refreshToken(refreshToken: string) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!jwtSecret || !jwtRefreshSecret)
      throw new AppError("Server configuration error", 500);

    let decoded: { userId: number };
    try {
      decoded = jwt.verify(refreshToken, jwtRefreshSecret) as {
        userId: number;
      };
    } catch {
      throw new AppError("Invalid refresh token", 401);
    }

    const sessions: UserSession[] = await sessionsRepository.findByUser(
      decoded.userId,
    );

    let validSession: UserSession | null = null;
    for (const session of sessions) {
      if (await verifyPassword(refreshToken, session.refresh_token_hash)) {
        validSession = session;
        break;
      }
    }

    if (!validSession) {
      await sessionsRepository.deleteUserSessions(decoded.userId);
      throw new AppError("Invalid refresh token", 401);
    }

    const newAccessToken: string = jwt.sign(
      { userId: decoded.userId },
      jwtSecret,
      { expiresIn: "15m" },
    );
    const newRefreshToken: string = jwt.sign(
      { userId: decoded.userId },
      jwtRefreshSecret,
      { expiresIn: "7d" },
    );

    await sessionsRepository.update(
      validSession.id,
      await hashPassword(newRefreshToken),
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  async logout(userId: number): Promise<void> {
    await sessionsRepository.deleteUserSessions(userId);
  },

  async register(data: RegisterPayload, req?: Request) {
    const email = minimize(data.email);

    const emailExists: User | null = await usersRepository.findByEmail(email);
    if (emailExists) throw new AppError("Email already exists", 409);

    const userRole = await rolesRepository.findByLabel("user");
    if (!userRole) throw new AppError("Default role not found", 500);

    const passwordHash = await hashPassword(data.password);

    await usersRepository.create(
      {
        email,
        last_name: capitalize(data.last_name),
        first_name: capitalizeFirst(data.first_name),
        role_id: userRole.id,
      },
      passwordHash,
    );

    return authService.login(email, data.password, req);
  },
};
