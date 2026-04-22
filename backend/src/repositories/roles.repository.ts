import { db } from "../config";
import { AppError } from "../types";
import { Role } from "../schemas";

export const rolesRepository = {
  async findById(roleId: number): Promise<Role> {
    const result = await db.query<Role>(`SELECT * FROM roles WHERE id = $1`, [roleId]);
    const role: Role | undefined = result.rows[0];
    if (!role) throw new AppError("Role not found", 404);
    return role;
  },

  async findByLabel(label: string): Promise<Role | null> {
    const result = await db.query<Role>(`SELECT * FROM roles WHERE label = $1`, [label]);
    return result.rows[0] || null;
  },

  async findAll(): Promise<Role[]> {
    return (await db.query<Role>("SELECT * FROM roles ORDER BY id")).rows;
  },
};
