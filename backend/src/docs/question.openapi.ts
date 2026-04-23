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
import { QuestionSchema, CreateQuestionPayloadSchema, UpdateQuestionPayloadSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/questions",
  tags: ["Questions"],
  summary: "Get all questions",
  responses: {
    200: JsonResponse(zod.array(QuestionSchema), "List of questions"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/questions/count",
  tags: ["Questions"],
  summary: "Count all questions",
  responses: {
    200: JsonResponse(zod.object({ count: zod.number() }), "Total number of questions"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/questions/step/{stepId}",
  tags: ["Questions"],
  summary: "Get questions by step",
  request: {
    params: zod.object({ stepId: zod.string() }),
  },
  responses: {
    200: JsonResponse(zod.array(QuestionSchema), "List of questions for step"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/questions/step/{stepId}/count",
  tags: ["Questions"],
  summary: "Count questions by step",
  request: {
    params: zod.object({ stepId: zod.string() }),
  },
  responses: {
    200: JsonResponse(zod.object({ count: zod.number() }), "Number of questions for step"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/questions/{questionId}",
  tags: ["Questions"],
  summary: "Get question by id",
  request: {
    params: zod.object({ questionId: zod.string() }),
  },
  responses: {
    200: JsonResponse(QuestionSchema, "Question found"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/questions",
  tags: ["Questions"],
  summary: "Create question",
  request: {
    body: { content: { "application/json": { schema: CreateQuestionPayloadSchema } } },
  },
  responses: {
    201: JsonResponse(QuestionSchema, "Question created"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "put",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/questions/{questionId}",
  tags: ["Questions"],
  summary: "Update question",
  request: {
    params: zod.object({ questionId: zod.string() }),
    body: { content: { "application/json": { schema: UpdateQuestionPayloadSchema } } },
  },
  responses: {
    200: JsonResponse(QuestionSchema, "Question updated"),
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
  path: "/questions/{questionId}",
  tags: ["Questions"],
  summary: "Delete question",
  request: {
    params: zod.object({ questionId: zod.string() }),
  },
  responses: {
    200: JsonResponse(QuestionSchema, "Question deleted"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
