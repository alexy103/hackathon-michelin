const { hashPassword } = require("../src/utils/migration-helpers/helpers");

exports.up = async (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      last_name VARCHAR(150) NOT NULL,
      first_name VARCHAR(150) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role_id INTEGER NOT NULL REFERENCES roles(id),
      is_activated BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )
  `);

  const passwordHashed = await hashPassword("Developpeur@12345");

  pgm.sql(`
    INSERT INTO users (last_name, first_name, email, password_hash, role_id, is_activated)
    VALUES ('Admin', 'admin', 'admin@example.com', '${passwordHashed}', 1, true)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE users`);
};
