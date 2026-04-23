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

	pgm.sql(`
    INSERT INTO question (label, image, timer, question_type_id, step_id)
    VALUES 
        ('Quel est ton budget pour cette expérience ?', null,null,1,1),
        ('Quand souhaites-tu vivre cette expérience ?', null, null, 1,1),
        ('Quelle expérience souhaites-tu faire ?', null, null, 2,1),
        ('Une bonne expérience c''est avant tout :', null, null, 3,2),
        ('Lors de tes choix, tu es plutôt :', null, null, 3,2),
        ('Tu fais plus confiance à :', null, null, 3,2),
        ('Clique sur le premier mot que tu vois :', null, 10, 4,3),
        ('Fais ton choix', null, 10, 5,3),
        ('Choisis ce qui t''attire', null, 10, 6,3)
  `);
};

exports.down = (pgm) => {
	pgm.sql(`DROP TABLE question`);
};
