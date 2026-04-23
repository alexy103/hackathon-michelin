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
import { StepSchema, CreateStepPayloadSchema, UpdateStepPayloadSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/steps",
  tags: ["Steps"],
  summary: "Get all steps",
  responses: {
    200: JsonResponse(zod.array(StepSchema), "List of steps"),
    401: UnauthorizedResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/steps/{stepId}",
  tags: ["Steps"],
  summary: "Get step by id",
  request: {
    params: zod.object({ stepId: zod.string() }),
  },
  responses: {
    200: JsonResponse(StepSchema, "Step found"),
    401: UnauthorizedResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "post",
  security: [{ BearerAuth: [] }],
  path: "/steps",
  tags: ["Steps"],
  summary: "Create step",
  request: {
    body: { content: { "application/json": { schema: CreateStepPayloadSchema } } },
  },
  responses: {
    201: JsonResponse(StepSchema, "Step created"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "put",
  security: [{ BearerAuth: [] }],
  path: "/steps/{stepId}",
  tags: ["Steps"],
  summary: "Update step",
  request: {
    params: zod.object({ stepId: zod.string() }),
    body: { content: { "application/json": { schema: UpdateStepPayloadSchema } } },
  },
  responses: {
    200: JsonResponse(StepSchema, "Step updated"),
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
  path: "/steps/{stepId}",
  tags: ["Steps"],
  summary: "Delete step",
  request: {
    params: zod.object({ stepId: zod.string() }),
  },
  responses: {
    200: JsonResponse(StepSchema, "Step deleted"),
    400: BadRequest,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
