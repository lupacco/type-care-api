import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  try {
      if (!authorization) throw errors.unauthorizedError();
    
      const parts = authorization.split(" ");
      if (parts.length !== 2) throw errors.unauthorizedError();
    
      const [schema, token] = parts;
    
      if (schema !== "Bearer") throw errors.unauthorizedError();
    
      jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {

        try {
            if(error) throw errors.unauthorizedError()

            const {
                rows: [user],
                } = await userRepository.findById(decoded.userId);

            if(!user) throw errors.unauthorizedError()

            delete user.password

            res.locals.user = user
            next()
        } catch (err) {
            next(err)
        }
      });
  } catch (err) {
    next(err)
  }
}
