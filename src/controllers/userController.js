import userServices from "../services/userServices.js"

async function create(req, res, next){
    const {type, name, email, password} = req.body

    try {
        const result = await userServices.create(type, name, email, password)
        const createdUserId = result.rows[0].id

        req.body.userId = createdUserId
        
        next()
    } catch (err) {
        next(err)
    }
}

async function signIn(req, res, next){
    const {email, password} = req.body
    
    try {
        const result = await userServices.signIn(email, password)     

        return res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export default {create, signIn}