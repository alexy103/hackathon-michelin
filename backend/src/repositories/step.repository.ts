import { db } from "../config";
import { AppError } from "../types";
import { Step, CreateStepPayload, UpdateStepPayload } from "../schemas";

export const stepRepository = {
  async findAll(): Promise<Step[]> {
    return (await db.query<Step>("SELECT * FROM step ORDER BY number")).rows;
  },

  async findById(stepId: number): Promise<Step> {
    const result = await db.query<Step>(`SELECT * FROM step WHERE id = $1`, [
      stepId,
    ]);
    const step: Step | undefined = result.rows[0];
    if (!step) throw new AppError("Step not found", 404);
    return step;
  },

  async findByLabel(label: string): Promise<Step | null> {
    const result = await db.query<Step>(
      `SELECT * FROM step WHERE label = $1`,
      [label],
    );
    const step: Step | undefined = result.rows[0];
    return step || null;
  },

  async create(data: CreateStepPayload): Promise<Step> {
    const result = await db.query<Step>(
      `INSERT INTO step (number, label) VALUES ($1, $2) RETURNING *`,
      [data.number, data.label],
    );
    const step: Step | undefined = result.rows[0];
    if (!step) throw new AppError("Step creation failed", 400);
    return step;
  },

  async update(stepId: number, data: UpdateStepPayload): Promise<Step> {
    const result = await db.query<Step>(
      `UPDATE step
       SET number = COALESCE($1, number),
           label = COALESCE($2, label),
           updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [data.number, data.label, stepId],
    );
    const step: Step | undefined = result.rows[0];
    if (!step) throw new AppError("Step update failed", 400);
    return step;
  },

  async delete(stepId: number): Promise<Step> {
    const result = await db.query<Step>(
      `DELETE FROM step WHERE id = $1 RETURNING *`,
      [stepId],
    );
    const step: Step | undefined = result.rows[0];
    if (!step) throw new AppError("Step delete failed", 400);
    return step;
  },
};
