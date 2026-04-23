exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS answer (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      image TEXT NULL,
      question_id INTEGER NOT NULL REFERENCES question(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE answer`);
};
