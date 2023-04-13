import httpStatus from "http-status"
//Types
import { Request, Response, NextFunction } from "express"
import { UserSignIn, UserSignUp } from "../protocols/User.js"
//Service
import userServices from "../services/userServices.js"

async function create(req: Request, res: Response, next: NextFunction){
    const newUser = req.body as UserSignUp

    try {
        const result = await userServices.create(newUser)
        const createdUserId = result.rows[0].id

        req.body.userId = createdUserId as number
        
        next()
    } catch (err) {
        next(err)
    }
}

async function signIn(req :Request, res: Response, next: NextFunction){
    const user = req.body as UserSignIn
    
    try {
        const result = await userServices.signIn(user)     

        return res.status(httpStatus.OK).send(result)
    } catch (err) {
        next(err)
    }
}

export default {create, signIn}