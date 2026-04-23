exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS question (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      image TEXT NULL,
      timer INTEGER NULL,
      question_type_id INTEGER NOT NULL REFERENCES question_type(id),
      step_id INTEGER NOT NULL REFERENCES step(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE question`);
};
