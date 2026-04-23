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

      ('Restaurant', null, 2),
      ('Hôtel', null, 2),
      ('Activité', null, 2),

      ('Matin', null, 3),
      ('Midi', null, 3),
      ('Soir', null, 3),

      ('La précision', null, 4),
      ('L''émotion', null, 4),
      ('La surprise', null, 4),
      ('La régularité', null, 4),

      ('Prudent', null, 5),
      ('Curieux', null, 5),
      ('Spontané', null, 5),
      ('Exigeant', null, 5),

      ('Votre instinct', null, 6),
      ('Une recommandation fiable', null, 6),
      ('Vos habitudes', null, 6),
      ('L''avis des autres', null, 6),

      ('Convivial', null, 7),
      ('Rapide', null, 7),
      ('Raffiné', null, 7),
      ('Découverte', null, 7),

      ('Rouge', null, 8),
      ('Bleu', null, 8),

      ('Bistrot animé', null, 9),
      ('Restaurant gastronomique', null, 9),

      ('Rooftop', null, 10),
      ('Terrasse animée', null, 10),
      ('Restaurant calme', null, 10),
      ('Street food', null, 10),

      ('Tradition', null, 11),
      ('Modernité', null, 11),
      ('Insolite', null, 11),
      ('Local', null, 11)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE answer`);
};
