import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/api-responses.utils";
import { AppError, AuthenticatedRequest, JwtPayload } from "../types";
import { rolesRepository, sessionsRepository, usersRepository } from "../repositories";
import { User, Role } from "../schemas";

export const requireAuth = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return ApiResponse.unauthorized(res, "Bearer token required");
    }

    const token: string = authHeader.replace("Bearer ", "");

    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) throw new AppError("Server configuration error", 500);

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      const sessions = await sessionsRepository.findByUser(decoded.userId);
      if (!sessions.length) return ApiResponse.unauthorized(res, "Invalid or expired token");

      const user: User = await usersRepository.findById(decoded.userId);
      if (!user.is_activated) return ApiResponse.unauthorized(res, "Account disabled");

      const role: Role = await rolesRepository.findById(user.role_id);

      if (allowedRoles.length > 0 && !allowedRoles.includes(role.label)) {
        return ApiResponse.forbidden(res, "Permission denied");
      }

      (req as AuthenticatedRequest).user = { userId: user.id, role: role.label };
      next();
    } catch {
      return ApiResponse.unauthorized(res, "Invalid or expired token");
    }
  };
};
