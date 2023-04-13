import errors from "../errors/index.js";
//Repositories
import doctorRepository from "../repositories/doctorRepository.js";
import userRepository from "../repositories/userRepository.js";
//Types
import { DoctorEntity } from "../protocols/Doctor.js"

async function create(newDoctor: Omit<DoctorEntity, "id">){
    const {crm, speciality, userId} = newDoctor
    const {rowCount} = await doctorRepository.findByCrm(crm)

    if(rowCount){
        await userRepository.deleteById(userId)
        throw errors.duplicatedCrm(crm)
    }

    await doctorRepository.create(crm, speciality, userId)
}

async function findByName(name: string){
    const {rowCount, rows: doctors} = await doctorRepository.findByName(name)

    if(!rowCount) throw errors.notFoundError()

    return doctors
}

async function findBySpeciality(speciality: string){
    const {rowCount, rows: doctors} = await doctorRepository.findBySpeciality(speciality)

    if(!rowCount) throw errors.notFoundError()

    return doctors
}

export default {create, findByName, findBySpeciality}