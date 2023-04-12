import errors from "../errors/index.js";
import doctorRepository from "../repositories/doctorRepository.js";
import userRepository from "../repositories/userRepository.js";

async function create(crm, speciality, userId){
    const {rowCount} = await doctorRepository.findByCrm(crm)

    if(rowCount){
        await userRepository.deleteById(userId)
        throw errors.duplicatedCrm(crm)
    }

    await doctorRepository.create(crm, speciality, userId)
}

async function findByName(name){
    const {rowCount, rows: doctors} = await doctorRepository.findByName(name)

    if(!rowCount) throw errors.notFoundError()

    return doctors
}

async function findBySpeciality(speciality){
    const {rowCount, rows: doctors} = await doctorRepository.findBySpeciality(speciality)

    if(!rowCount) throw errors.notFoundError()

    return doctors
}

export default {create, findByName, findBySpeciality}