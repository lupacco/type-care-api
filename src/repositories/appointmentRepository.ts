import connectionDb from "../config/database.js";
//Types
import { AppointmentConsult, AppointmentEntity, FreeAppointment } from "../protocols/Appointment.js";
import { QueryResult } from "pg";

async function create(date: string, time: string, doctorId: number) {
  await connectionDb.query(
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
    appointments.id,
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
  ) as QueryResult<FreeAppointment>;
}

async function getAppointment(date: string, time: string, doctorId: number) {
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
  ) as QueryResult<AppointmentEntity>;
}

async function findById(id: number) {
  return await connectionDb.query(
    `
    SELECT * FROM appointments WHERE id = $1
    `,
    [id]
  ) as QueryResult<AppointmentEntity>;
}

async function schedule(id: number, patientId: number) {
  await connectionDb.query(
    `
    UPDATE appointments 
    SET status='scheduled', 
    "patientId"=$1 
    WHERE id=$2
    `,
    [patientId, id]
  );
}

async function cancel(id: number) {
  await connectionDb.query(
    `
    UPDATE appointments 
    SET status='canceled' 
    WHERE id=$1
    `,
    [id]
  );
}

async function confirm(id: number) {
  await connectionDb.query(
    `
    UPDATE appointments 
    SET status='confirmed' 
    WHERE id=$1
    `,
    [id]
  );
}

async function finish(id: number) {
  await connectionDb.query(
    `
    UPDATE appointments 
    SET status='done' 
    WHERE id=$1
    `,
    [id]
  );
}

async function free(id: number) {
  await connectionDb.query(
    `
    UPDATE appointments 
    SET status='free', 
    "patientId"=NULL
    WHERE id=$1
    `,
    [id]
  );
}

async function getPatientScheduledAppointments(patientId: number) {
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
  ) as QueryResult<AppointmentConsult>;
}

async function getDoctorScheduledAppointments(doctorId: number) {
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
  ) as QueryResult<AppointmentConsult> | undefined;
}

async function getPatientHistory(patientId: number){
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
  ) as QueryResult<AppointmentConsult>;
}

async function getDoctorHistory(doctorId: number){
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
  ) as QueryResult<AppointmentConsult>;
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
