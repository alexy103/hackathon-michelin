import { db } from "../config";
import { AppError } from "../types";
import { Answer, CreateAnswerPayload, UpdateAnswerPayload } from "../schemas";

export const answerRepository = {
  async findAll(): Promise<Answer[]> {
    return (await db.query<Answer>("SELECT * FROM answer ORDER BY id")).rows;
  },

  async findById(answerId: number): Promise<Answer> {
    const result = await db.query<Answer>(`SELECT * FROM answer WHERE id = $1`, [answerId]);
    const answer: Answer | undefined = result.rows[0];
    if (!answer) throw new AppError("Answer not found", 404);
    return answer;
  },

  async findByLabel(label: string): Promise<Answer | null> {
    const result = await db.query<Answer>(`SELECT * FROM answer WHERE label = $1`, [label]);
    return result.rows[0] || null;
  },

  async findByQuestion(questionId: number): Promise<Answer[]> {
    return (await db.query<Answer>(`SELECT * FROM answer WHERE question_id = $1 ORDER BY id`, [questionId])).rows;
  },

  async create(data: CreateAnswerPayload): Promise<Answer> {
    const result = await db.query<Answer>(
      `INSERT INTO answer (label, image, question_id) VALUES ($1, $2, $3) RETURNING *`,
      [data.label, data.image ?? null, data.question_id],
    );
    const answer: Answer | undefined = result.rows[0];
    if (!answer) throw new AppError("Answer creation failed", 400);
    return answer;
  },

  async update(answerId: number, data: UpdateAnswerPayload): Promise<Answer> {
    const result = await db.query<Answer>(
      `UPDATE answer
       SET label = COALESCE($1, label),
           image = COALESCE($2, image),
           question_id = COALESCE($3, question_id),
           updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [data.label, data.image, data.question_id, answerId],
    );
    const answer: Answer | undefined = result.rows[0];
    if (!answer) throw new AppError("Answer update failed", 400);
    return answer;
  },

  async delete(answerId: number): Promise<Answer> {
    const result = await db.query<Answer>(`DELETE FROM answer WHERE id = $1 RETURNING *`, [answerId]);
    const answer: Answer | undefined = result.rows[0];
    if (!answer) throw new AppError("Answer delete failed", 400);
    return answer;
  },
};
