import { registry } from "./openapi.registry";
import zod from "zod";
import {
  BadRequest,
  ForbiddenResponse,
  JsonResponse,
  NotFoundResponse,
  ServerErrorResponse,
  UnauthorizedResponse,
} from "./openapi.responses";
import { UserAnswerSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/user-answers/me",
  tags: ["UserAnswers"],
  summary: "Get current user's answers",
  responses: {
    200: JsonResponse(zod.array(UserAnswerSchema), "List of current user's answers"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/user-answers",
  tags: ["UserAnswers"],
  summary: "Record an answer for current user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zod.object({ answerId: zod.number().openapi({ example: 1 }) }),
        },
      },
    },
  },
  responses: {
    201: JsonResponse(UserAnswerSchema, "User answer recorded"),
    400: BadRequest,
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "delete",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/user-answers",
  tags: ["UserAnswers"],
  summary: "Delete all answers for current user (admin)",
  responses: {
    200: JsonResponse(zod.null(), "User answers deleted"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});
