const { Client } = require("pg");

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

async function initializeDB() {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect();
    await client.query(createTableQuery);
    console.log("Logs table created or already exists.");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await client.end();
  }
}

initializeDB();

// module.exports = initializeDB;
