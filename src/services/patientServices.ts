import errors from "../errors/index.js";
//Repopsitories
import patientRepository from "../repositories/patientRepository.js";
import userRepository from "../repositories/userRepository.js";

async function create(cpf: string, userId: number){
    const {rows: [foundPatient]} = await patientRepository.findByCpf(cpf);

    if(foundPatient){
        await userRepository.deleteById(userId)
        throw errors.duplicatedCpf(cpf)
    }

    await patientRepository.create(cpf, userId)
}

export default {create}