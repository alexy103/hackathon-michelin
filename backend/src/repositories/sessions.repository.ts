import { db } from "../config";
import { AppError } from "../types";
import { UserSession } from "../schemas";

export const sessionsRepository = {
  async create(
    userId: number,
    refreshTokenHash: string,
    userAgent: string | null,
    ipAddress: string | null,
  ): Promise<UserSession> {
    const result = await db.query<UserSession>(
      `INSERT INTO users_sessions (user_id, refresh_token_hash, user_agent, ip_address)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, refreshTokenHash, userAgent, ipAddress],
    );

    const session: UserSession | undefined = result.rows[0];
    if (!session) throw new AppError("Session creation failed", 500);
    return session;
  },

  async findByUser(userId: number): Promise<UserSession[]> {
    const result = await db.query<UserSession>(
      `SELECT * FROM users_sessions WHERE user_id = $1`,
      [userId],
    );
    return result.rows;
  },

  async update(sessionId: number, refreshTokenHash: string): Promise<void> {
    await db.query(
      `UPDATE users_sessions SET refresh_token_hash = $1, updated_at = NOW() WHERE id = $2`,
      [refreshTokenHash, sessionId],
    );
  },

  async deleteUserSessions(userId: number): Promise<void> {
    await db.query(`DELETE FROM users_sessions WHERE user_id = $1`, [userId]);
  },
};
