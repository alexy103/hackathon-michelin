import { db } from "../config";
import { AppError } from "../types";
import { UserAnswer } from "../schemas";

export const userAnswerRepository = {
  async findByUser(userId: number): Promise<UserAnswer[]> {
    return (
      await db.query<UserAnswer>(`SELECT * FROM user_answers WHERE user_id = $1 ORDER BY date`, [userId])
    ).rows;
  },

  async create(userId: number, answerId: number): Promise<UserAnswer> {
    const result = await db.query<UserAnswer>(
      `INSERT INTO user_answers (user_id, answer_id) VALUES ($1, $2) RETURNING *`,
      [userId, answerId],
    );
    const userAnswer: UserAnswer | undefined = result.rows[0];
    if (!userAnswer) throw new AppError("User answer creation failed", 400);
    return userAnswer;
  },

  async deleteByUser(userId: number): Promise<void> {
    await db.query(`DELETE FROM user_answers WHERE user_id = $1`, [userId]);
  },
};
