import { prisma } from "../config/database.js";
import { QueryResult } from "pg";
import { PatientEntity } from "../protocols/Patient.js";

async function findByCpf(cpf: string){
    return await prisma.patient.findUnique({
        where: {
            cpf: cpf
        }
    }) as QueryResult<PatientEntity>
}

async function create(cpf: string, userId: number){
    await prisma.patient.create({
        data: {
            cpf: cpf,
            userId: userId
        }
    })
}

async function findByUserId(id: number){
    return await prisma.patient.findFirst({
        where: {
            userId: id
        }
    })
}

export default {findByCpf, create, findByUserId}