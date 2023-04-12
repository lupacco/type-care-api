import connectionDb from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(`SELECT * FROM users WHERE email = $1;`, [
    email,
  ]);
}

async function create({ type, name, email, password }) {
  return await connectionDb.query(
    `
        INSERT INTO users (type, name, email, password) VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
    [type, name, email, password]
  );
}

async function deleteById(userId) {
  return await connectionDb.query(`DELETE FROM users WHERE id = $1;`, [userId]);
}

async function findById(userId) {
  return await connectionDb.query(
    `
    SELECT * FROM users WHERE id = $1;`,
    [userId]
  );
}

export default { findByEmail, create, deleteById, findById };
