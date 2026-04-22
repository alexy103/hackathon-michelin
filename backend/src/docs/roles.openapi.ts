import { registry } from "./openapi.registry";
import zod from "zod";
import {
  ForbiddenResponse,
  JsonResponse,
  NotFoundResponse,
  ServerErrorResponse,
  UnauthorizedResponse,
} from "./openapi.responses";
import { RoleSchema } from "../schemas";

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/roles",
  tags: ["Roles"],
  summary: "Get all roles",
  responses: {
    200: JsonResponse(zod.array(RoleSchema), "List of roles"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    500: ServerErrorResponse,
  },
});

registry.registerPath({
  method: "get",
  security: [{ BearerAuth: [] }],
  path: "/roles/{roleId}",
  tags: ["Roles"],
  summary: "Get role by id",
  request: {
    params: zod.object({ roleId: zod.string() }),
  },
  responses: {
    200: JsonResponse(RoleSchema, "Role found"),
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    500: ServerErrorResponse,
  },
});
