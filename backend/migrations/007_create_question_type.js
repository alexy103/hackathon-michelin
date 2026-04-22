exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS question_type (
      id SERIAL PRIMARY KEY,
      label VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);

  pgm.sql(`
    INSERT INTO question_type (label) VALUES ('Qcm'), ('Mot croisé'), ('Swipe')
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE question_type`);
};
