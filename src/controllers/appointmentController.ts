import appointmentServices from "../services/appointmentServices.js"

async function create(req, res, next){
    const {date, time} = req.body
    const {user} = res.locals
    try {
        const result = await appointmentServices.create(user, date, time)
        
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

async function getFreeAppointments(req, res, next){
    try {
        const result = await appointmentServices.getFreeAppointments()
        res.send(result)
    } catch (err) {
        next(err)
    }
}

async function schedule(req, res, next){
    const {user} = res.locals
    const {id} = req.params
    try {
        await appointmentServices.schedule(user, id)

        return res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

async function updateStatus(req, res, next){
    const {user} = res.locals
    const {status, id} = req.params
    try {
        await appointmentServices.updateStatus(id, status, user)
        return res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

async function getScheduledAppointments(req, res, next){
    const {user} = res.locals

    try {
        const {rows: result} = await appointmentServices.getScheduledAppointments(user)
        return res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

async function getHistory(req, res, next){
    const {user} = res.locals

    try {
        console.log(user)
        const {rows: result} = await appointmentServices.getHistory(user)
        return res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export default {create, getFreeAppointments, schedule, updateStatus, getScheduledAppointments, getHistory}