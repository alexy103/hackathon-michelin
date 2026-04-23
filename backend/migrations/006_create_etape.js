exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS step (
      id SERIAL PRIMARY KEY,
      number INTEGER NOT NULL,
      label VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE step`);
};
