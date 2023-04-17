import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
//Repositories
import userRepository from "../repositories/userRepository.js";
//
import { UserSignIn, UserSignUp } from "../protocols/User.js";

async function create(newUser: UserSignUp) {
  const {email, password} = newUser
  

  const { rowCount } = await userRepository.findByEmail(email);

  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);

  return await userRepository.create({
    ...newUser,
    password: hashPassword
  });
}

async function signIn(user: UserSignIn) {
  const {email, password} = user
  const {
    rowCount,
    rows: [foundUser],
  } = await userRepository.findByEmail(email);
  
  if(!rowCount) throw errors.invalidCredentialsError()

  const passwordIsCorrect = await bcrypt.compare(password, foundUser.password);
  if (!passwordIsCorrect) throw errors.invalidCredentialsError();

  const token: string = jwt.sign({ userId: foundUser.id }, process.env.SECRET_JWT as string);

  return {
    token
  };
}

export default { create, signIn };
