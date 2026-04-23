import { db } from "../config";
import { AppError } from "../types";
import { Badge, CreateBadgePayload, UpdateBadgePayload } from "../schemas";

export const badgeRepository = {
  async findAll(): Promise<Badge[]> {
    return (await db.query<Badge>("SELECT * FROM badge ORDER BY id")).rows;
  },

  async findById(badgeId: number): Promise<Badge> {
    const result = await db.query<Badge>(`SELECT * FROM badge WHERE id = $1`, [badgeId]);
    const badge: Badge | undefined = result.rows[0];
    if (!badge) throw new AppError("Badge not found", 404);
    return badge;
  },

  async findByLabel(label: string): Promise<Badge | null> {
    const result = await db.query<Badge>(`SELECT * FROM badge WHERE label = $1`, [label]);
    return result.rows[0] || null;
  },

  async create(data: CreateBadgePayload): Promise<Badge> {
    const result = await db.query<Badge>(
      `INSERT INTO badge (label, image) VALUES ($1, $2) RETURNING *`,
      [data.label, data.image ?? null],
    );
    const badge: Badge | undefined = result.rows[0];
    if (!badge) throw new AppError("Badge creation failed", 400);
    return badge;
  },

  async update(badgeId: number, data: UpdateBadgePayload): Promise<Badge> {
    const result = await db.query<Badge>(
      `UPDATE badge
       SET label = COALESCE($1, label),
           image = COALESCE($2, image),
           updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [data.label, data.image, badgeId],
    );
    const badge: Badge | undefined = result.rows[0];
    if (!badge) throw new AppError("Badge update failed", 400);
    return badge;
  },

  async delete(badgeId: number): Promise<Badge> {
    const result = await db.query<Badge>(`DELETE FROM badge WHERE id = $1 RETURNING *`, [badgeId]);
    const badge: Badge | undefined = result.rows[0];
    if (!badge) throw new AppError("Badge delete failed", 400);
    return badge;
  },
};
