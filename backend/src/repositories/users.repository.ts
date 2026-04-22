import { db } from "../config";
import { AppError } from "../types";
import { CreateUserPayload, UpdateUserPayload, User } from "../schemas";

export const usersRepository = {
  async findAll(isActivated: string | undefined): Promise<User[]> {
    if (isActivated === "undefined") {
      return (await db.query<User>("SELECT * FROM users ORDER BY id")).rows;
    }

    const boolValue = isActivated === "true" ? "true" : "false";
    return (await db.query<User>(`SELECT * FROM users WHERE is_activated = $1`, [boolValue])).rows;
  },

  async findById(userId: number): Promise<User> {
    const result = await db.query<User>(`SELECT * FROM users WHERE id = $1`, [userId]);
    const user: User | undefined = result.rows[0];
    if (!user) throw new AppError("User not found", 404);
    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query<User>(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0] || null;
  },

  async create(data: CreateUserPayload, passwordHash: string): Promise<User> {
    const result = await db.query<User>(
      `INSERT INTO users (last_name, first_name, email, password_hash, role_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [data.last_name, data.first_name, data.email, passwordHash, data.role_id ?? 2],
    );

    const user: User | undefined = result.rows[0];
    if (!user) throw new AppError("User creation failed", 400);
    return user;
  },

  async update(userId: number, data: UpdateUserPayload): Promise<User> {
    const result = await db.query<User>(
      `UPDATE users
       SET last_name = COALESCE($1, last_name),
           first_name = COALESCE($2, first_name),
           email = COALESCE($3, email),
           updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [data.last_name, data.first_name, data.email, userId],
    );

    const user: User | undefined = result.rows[0];
    if (!user) throw new AppError("User update failed", 400);
    return user;
  },

  async updateActivation(userId: number, isActivated: boolean): Promise<User> {
    const result = await db.query<User>(
      `UPDATE users SET is_activated = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [isActivated, userId],
    );

    const user: User | undefined = result.rows[0];
    if (!user) throw new AppError("User activation update failed", 400);
    return user;
  },

  async delete(userId: number): Promise<User> {
    const result = await db.query<User>(`DELETE FROM users WHERE id = $1 RETURNING *`, [userId]);

    const user: User | undefined = result.rows[0];
    if (!user) throw new AppError("User delete failed", 400);
    return user;
  },
};
