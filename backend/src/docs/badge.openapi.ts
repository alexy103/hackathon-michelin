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
import { BadgeSchema, CreateBadgePayloadSchema, UpdateBadgePayloadSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/badges",
  tags: ["Badges"],
  summary: "Get all badges",
  responses: {
    200: JsonResponse(zod.array(BadgeSchema), "List of badges"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/badges/{badgeId}",
  tags: ["Badges"],
  summary: "Get badge by id",
  request: {
    params: zod.object({ badgeId: zod.string() }),
  },
  responses: {
    200: JsonResponse(BadgeSchema, "Badge found"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ BearerAuth: [] }],
  path: "/badges",
  tags: ["Badges"],
  summary: "Create badge",
  request: {
    body: { content: { "application/json": { schema: CreateBadgePayloadSchema } } },
  },
  responses: {
    201: JsonResponse(BadgeSchema, "Badge created"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "put",
  security: [{ BearerAuth: [] }],
  path: "/badges/{badgeId}",
  tags: ["Badges"],
  summary: "Update badge",
  request: {
    params: zod.object({ badgeId: zod.string() }),
    body: { content: { "application/json": { schema: UpdateBadgePayloadSchema } } },
  },
  responses: {
    200: JsonResponse(BadgeSchema, "Badge updated"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "delete",
  security: [{ BearerAuth: [] }],
  path: "/badges/{badgeId}",
  tags: ["Badges"],
  summary: "Delete badge",
  request: {
    params: zod.object({ badgeId: zod.string() }),
  },
  responses: {
    200: JsonResponse(BadgeSchema, "Badge deleted"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
