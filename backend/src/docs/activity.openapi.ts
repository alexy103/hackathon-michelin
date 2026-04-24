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
import { ActivitySchema, CreateActivityPayloadSchema, UpdateActivityPayloadSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/activities",
  tags: ["Activities"],
  summary: "Get all activities",
  responses: {
    200: JsonResponse(zod.array(ActivitySchema), "List of activities"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ ApiKeyAuth: [] }],
  path: "/activities/{activityId}",
  tags: ["Activities"],
  summary: "Get activity by id",
  request: {
    params: zod.object({ activityId: zod.string() }),
  },
  responses: {
    200: JsonResponse(ActivitySchema, "Activity found"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/activities",
  tags: ["Activities"],
  summary: "Create activity",
  request: {
    body: { content: { "application/json": { schema: CreateActivityPayloadSchema } } },
  },
  responses: {
    201: JsonResponse(ActivitySchema, "Activity created"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "put",
  security: [{ ApiKeyAuth: [], BearerAuth: [] }],
  path: "/activities/{activityId}",
  tags: ["Activities"],
  summary: "Update activity",
  request: {
    params: zod.object({ activityId: zod.string() }),
    body: { content: { "application/json": { schema: UpdateActivityPayloadSchema } } },
  },
  responses: {
    200: JsonResponse(ActivitySchema, "Activity updated"),
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
  path: "/activities/{activityId}",
  tags: ["Activities"],
  summary: "Delete activity",
  request: {
    params: zod.object({ activityId: zod.string() }),
  },
  responses: {
    200: JsonResponse(ActivitySchema, "Activity deleted"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
