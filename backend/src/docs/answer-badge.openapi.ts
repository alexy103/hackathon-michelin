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
import { BadgeSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/answers/{answerId}/badges",
  tags: ["AnswerBadges"],
  summary: "Get badges for an answer",
  request: {
    params: zod.object({ answerId: zod.string() }),
  },
  responses: {
    200: JsonResponse(zod.array(BadgeSchema), "List of badges for answer"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ BearerAuth: [] }],
  path: "/answers/{answerId}/badges",
  tags: ["AnswerBadges"],
  summary: "Add a badge to an answer",
  request: {
    params: zod.object({ answerId: zod.string() }),
    body: {
      content: {
        "application/json": {
          schema: zod.object({ badgeId: zod.number().openapi({ example: 1 }) }),
        },
      },
    },
  },
  responses: {
    201: JsonResponse(zod.null(), "Badge added to answer"),
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
  path: "/answers/{answerId}/badges/{badgeId}",
  tags: ["AnswerBadges"],
  summary: "Remove a badge from an answer",
  request: {
    params: zod.object({ answerId: zod.string(), badgeId: zod.string() }),
  },
  responses: {
    200: JsonResponse(zod.null(), "Badge removed from answer"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
