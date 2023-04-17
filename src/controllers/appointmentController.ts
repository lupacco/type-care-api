import appointmentServices from "../services/appointmentServices.js"
//Types
import {Request, Response, NextFunction} from "express"
import {AppointmentEntity} from "../protocols/Appointment.js"
import { UserEntity } from "../protocols/User.js"
import { QueryResult } from "pg"

async function create(req: Request, res: Response, next: NextFunction){
    const {date, time} = req.body as Pick<AppointmentEntity, "date" | "time">
    const user = res.locals.user as Omit<UserEntity, "password">
    try {
        await appointmentServices.create(user, date, time)
        
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

async function getFreeAppointments(req: Request, res: Response, next: NextFunction){
    try {
        const { rows: appointments } = await appointmentServices.getFreeAppointments()
        return res.status(200).send(appointments)
    } catch (err) {
        next(err)
    }
}

async function schedule(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user as Omit<UserEntity, "password">
    const {id} = req.params 
    try {
        await appointmentServices.schedule(user, Number(id))

        return res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

async function updateStatus(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user as Omit<UserEntity, "password">
    const {status, id} = req.params
    try {
        await appointmentServices.updateStatus(Number(id), status, user)
        return res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

async function getScheduledAppointments(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user as Omit<UserEntity, "password">

    try {
        const {rows: appointments} = await appointmentServices.getScheduledAppointments(user) as QueryResult;
        return res.status(200).send(appointments)
    } catch (err) {
        next(err)
    }
}

async function getHistory(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user as Omit<UserEntity, "password">

    try {
        const {rows: appointments} = await appointmentServices.getHistory(user) as QueryResult
        return res.status(200).send(appointments)
    } catch (err) {
        next(err)
    }
}

export default {create, getFreeAppointments, schedule, updateStatus, getScheduledAppointments, getHistory}