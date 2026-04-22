import zod from "zod";
import { registry } from "../docs/openapi.registry";

export const LoginPayloadSchema = zod
  .object({
    email: zod.email().openapi({ example: "john.doe@test.com" }),
    password: zod.string().min(1).openapi({ example: "P@ssw0rd1234" }),
  })
  .strict();
registry.register("LoginPayload", LoginPayloadSchema);

export const RegisterPayloadSchema = zod
  .object({
    last_name: zod.string().trim().min(1).max(150).regex(/^[a-zA-ZÀ-ÿ\s'-]+$/).openapi({ example: "DOE" }),
    first_name: zod.string().trim().min(1).max(150).regex(/^[a-zA-ZÀ-ÿ\s'-]+$/).openapi({ example: "John" }),
    email: zod.email().max(254).openapi({ example: "john.doe@test.com" }),
    password: zod
      .string()
      .min(12, "Password too short (minimum 12 characters)")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
        "Password must contain uppercase, lowercase, number, special char",
      )
      .openapi({ example: "P@ssw0rd1234" }),
  })
  .strict();
registry.register("RegisterPayload", RegisterPayloadSchema);

export type RegisterPayload = zod.infer<typeof RegisterPayloadSchema>;

export type LoginPayload = zod.infer<typeof LoginPayloadSchema>;
