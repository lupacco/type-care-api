import httpStatus from "http-status"
import doctorServices from "../services/doctorServices.js"
//Types
import {Request, Response, NextFunction} from "express"
import { DoctorEntity } from "../protocols/Doctor.js"

async function create(req: Request, res: Response, next: NextFunction){
    const newDoctor = req.body as Omit<DoctorEntity, "id">
    try {
        await doctorServices.create(newDoctor)
        return res.sendStatus(httpStatus.CREATED)
    } catch (err) {
        next(err)
    }
}

async function findByName(req: Request, res: Response, next: NextFunction){
    const {name} = req.body

    try {
        const result = await doctorServices.findByName(name)

        return res.status(httpStatus.OK).send(result)
    } catch (err) {
        next(err)
    }
}

async function findBySpeciality(req: Request, res: Response, next: NextFunction){
    const {speciality} = req.body
    
    try {
        const result = await doctorServices.findBySpeciality(speciality)

        return res.status(httpStatus.OK).send(result)
    } catch (err) {
        next(err)
    }
}

export default {create, findByName, findBySpeciality}