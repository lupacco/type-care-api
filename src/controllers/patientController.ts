import patientServices from "../services/patientServices.js";
//Types
import { Request, Response, NextFunction } from "express";
import { PatientEntity } from "../protocols/Patient.js";

async function create(req: Request, res: Response, next: NextFunction){
    const {type, cpf, userId} = req.body as Omit<PatientEntity, "id"> & {type: string}
    try {
        if(type !== 'patient') return next()

        await patientServices.create(cpf, userId)
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {create}