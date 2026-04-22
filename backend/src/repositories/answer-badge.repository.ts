import { db } from "../config";
import { AppError } from "../types";
import { Badge } from "../schemas";

export const answerBadgeRepository = {
  async findByAnswer(answerId: number): Promise<Badge[]> {
    return (
      await db.query<Badge>(
        `SELECT b.* FROM badge b
         INNER JOIN answer_badge ab ON ab.badge_id = b.id
         WHERE ab.answer_id = $1 ORDER BY b.id`,
        [answerId],
      )
    ).rows;
  },

  async addBadge(answerId: number, badgeId: number): Promise<Badge> {
    await db.query(
      `INSERT INTO answer_badge (badge_id, answer_id) VALUES ($1, $2)`,
      [badgeId, answerId],
    );
    const result = await db.query<Badge>(`SELECT * FROM badge WHERE id = $1`, [badgeId]);
    const badge = result.rows[0];
    if (!badge) throw new AppError("Failed to add badge to answer", 400);
    return badge;
  },

  async removeBadge(answerId: number, badgeId: number): Promise<Badge> {
    const result = await db.query<Badge>(`SELECT * FROM badge WHERE id = $1`, [badgeId]);
    const badge = result.rows[0];
    if (!badge) throw new AppError("Badge not found", 404);
    await db.query(
      `DELETE FROM answer_badge WHERE answer_id = $1 AND badge_id = $2`,
      [answerId, badgeId],
    );
    return badge;
  },
};
