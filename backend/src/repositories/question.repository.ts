import { db } from "../config";
import { AppError } from "../types";
import {
  Question,
  CreateQuestionPayload,
  UpdateQuestionPayload,
} from "../schemas";

export const questionRepository = {
  async findAll(): Promise<Question[]> {
    return (await db.query<Question>("SELECT * FROM question ORDER BY id"))
      .rows;
  },

  async findById(questionId: number): Promise<Question> {
    const result = await db.query<Question>(
      `SELECT * FROM question WHERE id = $1`,
      [questionId],
    );
    const question: Question | undefined = result.rows[0];
    if (!question) throw new AppError("Question not found", 404);
    return question;
  },

  async findByLabel(label: string): Promise<Question | null> {
    const result = await db.query<Question>(
      `SELECT * FROM question WHERE label = $1`,
      [label],
    );
    return result.rows[0] || null;
  },

  async findByStep(stepId: number): Promise<Question[]> {
    return (
      await db.query<Question>(
        `SELECT * FROM question WHERE step_id = $1 ORDER BY id`,
        [stepId],
      )
    ).rows;
  },

  async countByStep(stepId: number): Promise<number> {
    return (
      (
        await db.query<Question>(`SELECT * FROM question WHERE step_id = $1`, [
          stepId,
        ])
      ).rowCount || 0
    );
  },

  async countQuestion(): Promise<number> {
    return (await db.query<Question>(`SELECT * FROM question`)).rowCount || 0;
  },

  async create(data: CreateQuestionPayload): Promise<Question> {
    const result = await db.query<Question>(
      `INSERT INTO question (label, image, timer, question_type_id, step_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.label,
        data.image ?? null,
        data.timer ?? null,
        data.question_type_id,
        data.step_id,
      ],
    );
    const question: Question | undefined = result.rows[0];
    if (!question) throw new AppError("Question creation failed", 400);
    return question;
  },

  async update(
    questionId: number,
    data: UpdateQuestionPayload,
  ): Promise<Question> {
    const result = await db.query<Question>(
      `UPDATE question
       SET label = COALESCE($1, label),
           image = COALESCE($2, image),
           timer = COALESCE($3, timer),
           question_type_id = COALESCE($4, question_type_id),
           step_id = COALESCE($5, step_id),
           updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [
        data.label,
        data.image,
        data.timer,
        data.question_type_id,
        data.step_id,
        questionId,
      ],
    );
    const question: Question | undefined = result.rows[0];
    if (!question) throw new AppError("Question update failed", 400);
    return question;
  },

  async delete(questionId: number): Promise<Question> {
    const result = await db.query<Question>(
      `DELETE FROM question WHERE id = $1 RETURNING *`,
      [questionId],
    );
    const question: Question | undefined = result.rows[0];
    if (!question) throw new AppError("Question delete failed", 400);
    return question;
  },
};
