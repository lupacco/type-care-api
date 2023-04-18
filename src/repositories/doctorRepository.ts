import { prisma } from "../config/database.js";
//Types
import { QueryResult } from "pg";
import { DoctorEntity } from "../protocols/Doctor.js"

async function create(crm: string, speciality: string, userId: number) {
  await prisma.doctor.create({
    data: {
      crm: crm,
      speciality: speciality,
      userId: userId
    }
  })
  
}

async function findByCrm(crm: string) {
  return await prisma.doctor.findUnique({
    where: {
      crm: crm
    }
  }) as QueryResult<DoctorEntity>;
}

async function findByName(name: string) {
  return await prisma.doctor.findMany({
    select:{
      id: true,
      crm:true,
      speciality: true,
      userId: false
    },
    include: {
      users: {
        select: {
          name
        }
      }
    },
    where:{
      name:{
        startsWith: name
      }
    }
  }) as QueryResult<Omit<DoctorEntity, "userId"> & {name: string}>;
  // return await connectionDb.query(
  //   `
  //   SELECT doctors.id, doctors.crm, doctors.speciality, users.name FROM doctors
  //   JOIN users ON users.id = doctors."userId"
  //   WHERE users.name ILIKE '${name}%'
  //   `
  // ) 
}

async function findBySpeciality(speciality: string) {
  return await prisma.doctor.findMany({
    select:{
      id: true,
      crm:true,
      speciality: true,
      userId: false
    },
    include: {
      users: {
        select: {
          name: true
        }
      }
    },
    where:{
      speciality: speciality
    }
  }) as QueryResult<Omit<DoctorEntity, "userId"> & {name: string}>;
  // return await connectionDb.query(
  //   `
  //   SELECT doctors.id, doctors.crm, doctors.speciality, users.name FROM doctors
  //   JOIN users ON users.id = doctors."userId"
  //   WHERE doctors.speciality=$1
  //   `,
  //   [speciality]
  // )
}

async function findByUserId(userId: number) {
  return await prisma.doctor.findUnique({
    where: {
      userId: userId
    }
  })  as QueryResult<{id: number}>;
  // return await connectionDb.query(
  //   `
  // SELECT doctors.id FROM doctors WHERE "userId" = $1
  // `,
  //   [userId]
  // )
}

export default { create, findByCrm, findByName, findBySpeciality, findByUserId };
