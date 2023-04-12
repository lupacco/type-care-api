import connectionDb from "../config/database.js";

async function create(date, time, doctorId) {
  return await connectionDb.query(
    `
    INSERT INTO appointments ("scheduledDate", "scheduledTime",  "doctorId")
    VALUES ($1, $2, $3)
    `,
    [date, time, doctorId]
  );
}

async function getFreeAppointments() {
  return await connectionDb.query(
    `
    SELECT 
    appointments."scheduledDate",
    appointments."scheduledTime",
    appointments.status,
    users.name AS "doctorName",
    doctors.speciality 
    FROM appointments 
    JOIN doctors 
      ON appointments."doctorId" = doctors.id
    JOIN users 
        ON doctors."userId" = users.id
    WHERE appointments.status='free'
  `
  );
}

async function getAppointment(date, time, doctorId) {
  return await connectionDb.query(
    `
    SELECT * 
    FROM appointments 
    WHERE 
    "scheduledDate"=$1 AND 
    "scheduledTime"=$2 AND 
    "doctorId"=$3
    `,
    [date, time, doctorId]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `
    SELECT * FROM appointments WHERE id = $1
    `,
    [id]
  );
}

async function schedule(id, patientId) {
  console.log("schedule");
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='scheduled', 
    "patientId"=$1 
    WHERE id=$2
    `,
    [patientId, id]
  );
}

async function cancel(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='canceled', 
    WHERE id=$1
    `,
    [id]
  );
}

async function confirm(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='confirmed' 
    WHERE id=$1
    `,
    [id]
  );
}

async function finish(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='done' 
    WHERE id=$1
    `,
    [id]
  );
}

async function free(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='free', 
    "patientId"=NULL
    WHERE id=$1
    `,
    [id]
  );
}

async function getPatientScheduledAppointments(patientId) {
  return await connectionDb.query(
    `
    SELECT
        appointments.id,
        appointments."scheduledDate",
        appointments."scheduledTime",
        users.name AS "doctorName",
        doctors.speciality
    FROM appointments
    JOIN doctors
        ON doctors.id = appointments."doctorId"
    JOIN users
        ON users.id = doctors."userId"
    JOIN patients
        ON patients.id = appointments."patientId"
    WHERE appointments.status='scheduled' AND patients.id=$1
    `,
    [patientId]
  );
}

async function getDoctorScheduledAppointments(doctorId) {
  return await connectionDb.query(
    `
    SELECT
        appointments.id,
        appointments."scheduledDate",
        appointments."scheduledTime",
        users.name AS "patientName"
    FROM appointments
    JOIN patients
        ON patients.id = appointments."patientId"
    JOIN users
        ON users.id = patients."userId"
    JOIN doctors
        ON doctors.id = appointments."doctorId"
    WHERE appointments.status='scheduled' AND doctors.id=$1
    `,
    [doctorId]
  );
}

async function getPatientHistory(patientId){
  return await connectionDb.query(
    `
    SELECT
        appointments.id,
        appointments."scheduledDate",
        appointments."scheduledTime",
        users.name AS "doctorName",
        doctors.speciality
    FROM appointments
    JOIN doctors
        ON doctors.id = appointments."doctorId"
    JOIN users
        ON users.id = doctors."userId"
    JOIN patients
        ON patients.id = appointments."patientId"
    WHERE appointments.status='done' AND patients.id=$1
    `,
    [patientId]
  );
}

async function getDoctorHistory(doctorId){
  return await connectionDb.query(
    `
    SELECT
        appointments.id,
        appointments."scheduledDate",
        appointments."scheduledTime",
        users.name AS "patientName"
    FROM appointments
    JOIN patients
        ON patients.id = appointments."patientId"
    JOIN users
        ON users.id = patients."userId"
    JOIN doctors
        ON doctors.id = appointments."doctorId"
    WHERE appointments.status='done' AND doctors.id=$1
    `,
    [doctorId]
  );
}

export default {
  getAppointment,
  getFreeAppointments,
  findById,
  create,
  schedule,
  cancel,
  confirm,
  finish,
  free,
  getPatientScheduledAppointments,
  getDoctorScheduledAppointments,
  getPatientHistory,
  getDoctorHistory
};
