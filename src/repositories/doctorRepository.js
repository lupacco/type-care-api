import connectionDb from "../config/database.js";

async function create(crm, speciality, userId) {
  return await connectionDb.query(
    `
        INSERT INTO doctors (crm, speciality, "userId")
        VALUES ($1, $2, $3)
        `,
    [crm, speciality, userId]
  );
}

async function findByCrm(crm) {
  return await connectionDb.query(
    `
    SELECT * FROM doctors WHERE crm = $1
    `,
    [crm]
  );
}

async function findByName(name) {
  return await connectionDb.query(
    `
    SELECT doctors.id, doctors.crm, doctors.speciality, users.name FROM doctors
    JOIN users ON users.id = doctors."userId"
    WHERE users.name ILIKE '${name}%'
    `
  );
}

async function findBySpeciality(speciality) {
  return await connectionDb.query(
    `
    SELECT doctors.id, doctors.crm, doctors.speciality, users.name FROM doctors
    JOIN users ON users.id = doctors."userId"
    WHERE doctors.speciality=$1
    `,
    [speciality]
  );
}

async function findByUserId(userId) {
  return await connectionDb.query(
    `
  SELECT doctors.id FROM doctors WHERE "userId" = $1
  `,
    [userId]
  );
}

export default { create, findByCrm, findByName, findBySpeciality, findByUserId };
