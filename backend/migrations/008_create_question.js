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
        ('Quel budget souhaitez-vous consacrer à cette expérience ?', null,null,1,1),
        ('Type d’expérience Que souhaitez-vous faire ?', null, null, 1,1),
        ('Moment Quand souhaitez-vous vivre cette expérience ?', null, null, 1,1),
        ('Une bonne expérience repose avant tout sur :', null, null, 1,2),
        ('Dans vos choix, vous êtes plutôt :', null, null, 1,2),
        ('Vous faites le plus confiance à :', null, null, 1,2),
        ('Choisissez instinctivement un mot :', null, 10, 1,3),
        ('Choisissez sans réfléchir :', null, 10, 1,3),
        ('Choisissez une image : smash or pass', null, 10, 3,3),
        ('Choisissez l’ambiance qui vous attire', null, 10, 4,3),
        ('Vous êtes plus attiré par :', null, 10, 1, 3)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE question`);
};
