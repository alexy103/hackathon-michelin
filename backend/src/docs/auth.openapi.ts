import { registry } from "./openapi.registry";
import zod from "zod";
import {
  BadRequest,
  ConflictResponse,
  JsonResponse,
  ServerErrorResponse,
  UnauthorizedResponse,
} from "./openapi.responses";
import { LoginPayloadSchema, RegisterPayloadSchema } from "../schemas";

const TokenResponseSchema = zod.object({
  userId: zod.number().openapi({ example: 1 }),
  role: zod.string().openapi({ example: "admin" }),
  accessToken: zod.string().openapi({ example: "eyJ..." }),
  refreshToken: zod.string().openapi({ example: "eyJ..." }),
  sessionId: zod.number().openapi({ example: 1 }),
});

const RefreshResponseSchema = zod.object({
  accessToken: zod.string().openapi({ example: "eyJ..." }),
  refreshToken: zod.string().openapi({ example: "eyJ..." }),
});

const MessageSchema = zod.object({ message: zod.string() });

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [] }],
  path: "/auth/register",
  tags: ["Auth"],
  summary: "Register a new user account",
  request: {
    body: { content: { "application/json": { schema: RegisterPayloadSchema } } },
  },
  responses: {
    201: JsonResponse(TokenResponseSchema, "Registration successful"),
    400: BadRequest,
    409: ConflictResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [] }],
  path: "/auth/login",
  tags: ["Auth"],
  summary: "Login and get tokens",
  request: {
    body: { content: { "application/json": { schema: LoginPayloadSchema } } },
  },
  responses: {
    200: JsonResponse(TokenResponseSchema, "Login successful"),
    400: BadRequest,
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [] }],
  path: "/auth/refresh",
  tags: ["Auth"],
  summary: "Refresh access token",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zod.object({ refreshToken: zod.string() }),
        },
      },
    },
  },
  responses: {
    200: JsonResponse(RefreshResponseSchema, "Tokens refreshed"),
    400: BadRequest,
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/auth/logout",
  tags: ["Auth"],
  summary: "Logout and invalidate session",
  responses: {
    200: JsonResponse(MessageSchema, "Logged out"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});
