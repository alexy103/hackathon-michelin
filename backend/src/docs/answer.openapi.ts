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
import { AnswerSchema, CreateAnswerPayloadSchema, UpdateAnswerPayloadSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/answers",
  tags: ["Answers"],
  summary: "Get all answers",
  responses: {
    200: JsonResponse(zod.array(AnswerSchema), "List of answers"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/answers/question/{questionId}",
  tags: ["Answers"],
  summary: "Get answers by question",
  request: {
    params: zod.object({ questionId: zod.string() }),
  },
  responses: {
    200: JsonResponse(zod.array(AnswerSchema), "List of answers for question"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/answers/{answerId}",
  tags: ["Answers"],
  summary: "Get answer by id",
  request: {
    params: zod.object({ answerId: zod.string() }),
  },
  responses: {
    200: JsonResponse(AnswerSchema, "Answer found"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/answers",
  tags: ["Answers"],
  summary: "Create answer",
  request: {
    body: { content: { "application/json": { schema: CreateAnswerPayloadSchema } } },
  },
  responses: {
    201: JsonResponse(AnswerSchema, "Answer created"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "put",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/answers/{answerId}",
  tags: ["Answers"],
  summary: "Update answer",
  request: {
    params: zod.object({ answerId: zod.string() }),
    body: { content: { "application/json": { schema: UpdateAnswerPayloadSchema } } },
  },
  responses: {
    200: JsonResponse(AnswerSchema, "Answer updated"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "delete",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/answers/{answerId}",
  tags: ["Answers"],
  summary: "Delete answer",
  request: {
    params: zod.object({ answerId: zod.string() }),
  },
  responses: {
    200: JsonResponse(AnswerSchema, "Answer deleted"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
