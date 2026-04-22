import { db } from "../config";
import { AppError } from "../types";
import { Activity, CreateActivityPayload, UpdateActivityPayload } from "../schemas";

export const activityRepository = {
  async findAll(): Promise<Activity[]> {
    return (await db.query<Activity>("SELECT * FROM activity ORDER BY id")).rows;
  },

  async findById(activityId: number): Promise<Activity> {
    const result = await db.query<Activity>(`SELECT * FROM activity WHERE id = $1`, [activityId]);
    const activity: Activity | undefined = result.rows[0];
    if (!activity) throw new AppError("Activity not found", 404);
    return activity;
  },

  async findByLabel(label: string): Promise<Activity | null> {
    const result = await db.query<Activity>(`SELECT * FROM activity WHERE label = $1`, [label]);
    return result.rows[0] || null;
  },

  async create(data: CreateActivityPayload): Promise<Activity> {
    const result = await db.query<Activity>(
      `INSERT INTO activity (label, image, type, badge_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.label, data.image ?? null, data.type, data.badge_id],
    );
    const activity: Activity | undefined = result.rows[0];
    if (!activity) throw new AppError("Activity creation failed", 400);
    return activity;
  },

  async update(activityId: number, data: UpdateActivityPayload): Promise<Activity> {
    const result = await db.query<Activity>(
      `UPDATE activity
       SET label = COALESCE($1, label),
           image = COALESCE($2, image),
           type = COALESCE($3, type),
           badge_id = COALESCE($4, badge_id),
           updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [data.label, data.image, data.type, data.badge_id, activityId],
    );
    const activity: Activity | undefined = result.rows[0];
    if (!activity) throw new AppError("Activity update failed", 400);
    return activity;
  },

  async delete(activityId: number): Promise<Activity> {
    const result = await db.query<Activity>(`DELETE FROM activity WHERE id = $1 RETURNING *`, [activityId]);
    const activity: Activity | undefined = result.rows[0];
    if (!activity) throw new AppError("Activity delete failed", 400);
    return activity;
  },
};
