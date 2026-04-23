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
import { CreateQuestionTypePayloadSchema, QuestionTypeSchema, UpdateQuestionTypePayloadSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/question-types",
  tags: ["QuestionTypes"],
  summary: "Get all question types",
  responses: {
    200: JsonResponse(zod.array(QuestionTypeSchema), "List of question types"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/question-types/{typeId}",
  tags: ["QuestionTypes"],
  summary: "Get question type by id",
  request: { params: zod.object({ typeId: zod.string() }) },
  responses: {
    200: JsonResponse(QuestionTypeSchema, "Question type found"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/question-types",
  tags: ["QuestionTypes"],
  summary: "Create question type",
  request: { body: { content: { "application/json": { schema: CreateQuestionTypePayloadSchema } } } },
  responses: {
    201: JsonResponse(QuestionTypeSchema, "Question type created"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "put",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/question-types/{typeId}",
  tags: ["QuestionTypes"],
  summary: "Update question type",
  request: {
    params: zod.object({ typeId: zod.string() }),
    body: { content: { "application/json": { schema: UpdateQuestionTypePayloadSchema } } },
  },
  responses: {
    200: JsonResponse(QuestionTypeSchema, "Question type updated"),
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
  path: "/question-types/{typeId}",
  tags: ["QuestionTypes"],
  summary: "Delete question type",
  request: { params: zod.object({ typeId: zod.string() }) },
  responses: {
    200: JsonResponse(QuestionTypeSchema, "Question type deleted"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
