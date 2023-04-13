import { QueryResult } from "pg";
import connectionDb from "../config/database.js";
import { PatientEntity } from "../protocols/Patient.js";

async function findByCpf(cpf: string){
    return await connectionDb.query(`
        SELECT * FROM patients WHERE cpf = $1
    `,
    [cpf]) as QueryResult<PatientEntity>
}

async function create(cpf: string, userId: number){
    await connectionDb.query(`
        INSERT INTO patients (cpf, "userId")
        VALUES ($1, $2)
    `,
    [cpf, userId])
}

async function findByUserId(id: number){
    return await connectionDb.query(`
    SELECT * FROM patients WHERE "userId"=$1
    `,[id]) as QueryResult<PatientEntity>
}

export default {findByCpf, create, findByUserId}