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
        ('1', 'Ton moment'),
        ('2', 'Ton approche'),
        ('3', 'Ton réflexe')
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE step`);
};
