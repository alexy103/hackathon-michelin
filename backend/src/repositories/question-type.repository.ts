import { db } from "../config";
import { AppError } from "../types";
import {
  QuestionType,
  CreateQuestionTypePayload,
  UpdateQuestionTypePayload,
} from "../schemas";

export const questionTypeRepository = {
  async findAll(): Promise<QuestionType[]> {
    return (
      await db.query<QuestionType>("SELECT * FROM question_type ORDER BY id")
    ).rows;
  },

  async findById(id: number): Promise<QuestionType> {
    const result = await db.query<QuestionType>(
      `SELECT * FROM question_type WHERE id = $1`,
      [id],
    );
    const questionType: QuestionType | undefined = result.rows[0];
    if (!questionType) throw new AppError("Question type not found", 404);
    return questionType;
  },

  async findByLabel(label: string): Promise<QuestionType | null> {
    const result = await db.query<QuestionType>(
      `SELECT * FROM question_type WHERE label = $1`,
      [label],
    );
    const questionType: QuestionType | undefined = result.rows[0];

    return questionType || null;
  },

  async create(data: CreateQuestionTypePayload): Promise<QuestionType> {
    const result = await db.query<QuestionType>(
      `INSERT INTO question_type (label) VALUES ($1) RETURNING *`,
      [data.label],
    );
    const questionType: QuestionType | undefined = result.rows[0];
    if (!questionType) throw new AppError("Question type creation failed", 400);
    return questionType;
  },

  async update(
    id: number,
    data: UpdateQuestionTypePayload,
  ): Promise<QuestionType> {
    const result = await db.query<QuestionType>(
      `UPDATE question_type SET label = COALESCE($1, label), updated_at = NOW() WHERE id = $2 RETURNING *`,
      [data.label, id],
    );
    const questionType: QuestionType | undefined = result.rows[0];
    if (!questionType) throw new AppError("Question type update failed", 400);
    return questionType;
  },

  async delete(id: number): Promise<QuestionType> {
    const result = await db.query<QuestionType>(
      `DELETE FROM question_type WHERE id = $1 RETURNING *`,
      [id],
    );
    const questionType: QuestionType | undefined = result.rows[0];
    if (!questionType) throw new AppError("Question type delete failed", 400);
    return questionType;
  },
};
