exports.up = (pgm) => {
  pgm.sql(`
    CREATE TYPE activity_type AS ENUM ('Restaurant', 'Hôtel')
  `);

  pgm.sql(`
    CREATE TABLE IF NOT EXISTS activity (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      image TEXT NULL,
      type activity_type NOT NULL,
      badge_id INTEGER NOT NULL REFERENCES badge(id),
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE activity`);
  pgm.sql(`DROP TYPE activity_type`);
};
