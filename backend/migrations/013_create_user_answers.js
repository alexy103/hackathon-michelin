exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS user_answers (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      answer_id INTEGER NOT NULL REFERENCES answer(id) ON DELETE CASCADE,
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      PRIMARY KEY (user_id, answer_id)
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE user_answers`);
};
