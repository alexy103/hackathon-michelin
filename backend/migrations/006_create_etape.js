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

  pgm.sql(`
    INSERT INTO step (number, label)
    VALUES 
        ('1', 'Étape 1'),
        ('2', 'Étape 2'),
        ('3', 'Étape 3')
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE step`);
};
