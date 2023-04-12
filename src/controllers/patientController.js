import patientServices from "../services/patientServices.js";

async function create(req, res, next){
    const {type, cpf, userId} = req.body
    try {
        if(type !== 'patient') return next()

        await patientServices.create(cpf, userId)
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {create}