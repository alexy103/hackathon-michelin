exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS answer_badge (
      badge_id INTEGER NOT NULL REFERENCES badge(id) ON DELETE CASCADE,
      answer_id INTEGER NOT NULL REFERENCES answer(id) ON DELETE CASCADE,
      PRIMARY KEY (badge_id, answer_id)
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE answer_badge`);
};
