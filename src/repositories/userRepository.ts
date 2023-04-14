import { QueryResult } from "pg";
import connectionDb from "../config/database.js";
//Types
import {UserEntity, UserSignUp } from "../protocols/User.js";

async function findByEmail(email: string) {
  console.log('aiaiai')
  console.log(email)
  const result = await connectionDb.query(`SELECT * FROM users WHERE email = $1;`, [
    email,
  ])
  console.log(result)
  console.log('oi')
  return result as QueryResult<UserEntity>
}

async function create(newUser: UserSignUp) {
  console.log('chego no 2o repo')
  const { type, name, email, password } = newUser;
  console.log("chegou no controleler")
  return await connectionDb.query(
    `
    INSERT INTO users (type, name, email, password) VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [type, name, email, password]
  ) as QueryResult<{id: number}>;
}

async function deleteById(userId: number) {
  await connectionDb.query(`DELETE FROM users WHERE id = $1;`, [userId]);
}

async function findById(userId: number) {
  return await connectionDb.query(
    `
    SELECT * FROM users WHERE id = $1;
    `,
    [userId]
  ) as QueryResult<Omit<UserEntity, "password">>;
}

export default { findByEmail, create, deleteById, findById };
