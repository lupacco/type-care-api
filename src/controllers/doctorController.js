import doctorServices from "../services/doctorServices.js"

async function create(req, res, next){
    const {type, crm, speciality, userId} = req.body
    try {
        await doctorServices.create(crm, speciality, userId)
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

async function findByName(req, res, next){
    const {name} = req.body

    try {
        const result = await doctorServices.findByName(name)

        return res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

async function findBySpeciality(req, res, next){
    const {speciality} = req.body
    
    try {
        const result = await doctorServices.findBySpeciality(speciality)

        return res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export default {create, findByName, findBySpeciality}