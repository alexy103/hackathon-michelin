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

  pgm.sql(`
    INSERT INTO answer (label, image, question_id)
    VALUES
      ('0', null, 1),
      ('1', null, 1),
      ('2', null, 1),
      ('3', null, 1),
      ('4', null, 1),

      ('Restaurant', null, 3),
      ('Hôtel', null, 3),
      ('Activité', null, 3),

      ('Matin', null, 2),
      ('Midi', null, 2),
      ('Soir', null, 2),

      ('Que tout soit parfait', null, 4),
      ('Ressentir une émotion', null, 4),
      ('Être surpris', null, 4),
      ('Pouvoir y retourner sans hésiter', null, 4),

      ('Plutôt safe', null, 5),
      ('Exigeant', null, 5),
      ('Toujours curieux', null, 5),
      ('One life', null, 5),

      ('Mon instinct', null, 6),
      ('Une source fiable', null, 6),
      ('Mes habitudes', null, 6),
      ('L''avis des autres', null, 6),

      ('Convivial', null, 7),
      ('Rapide', null, 7),
      ('Raffiné', null, 7),
      ('Découverte', null, 7),

      ('Bistrot animé', null, 8),
      ('Restaurant gastronomique', null, 8),

      ('Local', null, 9),
      ('Insolite', null, 9),
      ('Modernité', null, 9),
      ('Tradition', null, 9)
      
      ('Rooftop', null, 9),
      ('Terrasse animée', null, 9),
      ('Restaurant calme', null, 9),
      ('Street food', null, 9)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE answer`);
};
