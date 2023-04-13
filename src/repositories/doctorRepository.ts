import connectionDb from "../config/database.js";
//Types
import { QueryResult } from "pg";
import { DoctorEntity } from "../protocols/Doctor.js"

async function create(crm: string, speciality: string, userId: number) {
  await connectionDb.query(
    `
        INSERT INTO doctors (crm, speciality, "userId")
        VALUES ($1, $2, $3)
        `,
    [crm, speciality, userId]
  );
}

async function findByCrm(crm: string) {
  return await connectionDb.query(
    `
    SELECT * FROM doctors WHERE crm = $1
    `,
    [crm]
  ) as QueryResult<DoctorEntity>;
}

async function findByName(name: string) {
  return await connectionDb.query(
    `
    SELECT doctors.id, doctors.crm, doctors.speciality, users.name FROM doctors
    JOIN users ON users.id = doctors."userId"
    WHERE users.name ILIKE '${name}%'
    `
  ) as QueryResult<Omit<DoctorEntity, "userId"> & {name: string}>;
}

async function findBySpeciality(speciality: string) {
  return await connectionDb.query(
    `
    SELECT doctors.id, doctors.crm, doctors.speciality, users.name FROM doctors
    JOIN users ON users.id = doctors."userId"
    WHERE doctors.speciality=$1
    `,
    [speciality]
  ) as QueryResult<Omit<DoctorEntity, "userId"> & {name: string}>;;
}

async function findByUserId(userId: number) {
  return await connectionDb.query(
    `
  SELECT doctors.id FROM doctors WHERE "userId" = $1
  `,
    [userId]
  ) as QueryResult<{id: number}>;
}

export default { create, findByCrm, findByName, findBySpeciality, findByUserId };
