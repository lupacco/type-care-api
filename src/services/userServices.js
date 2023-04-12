import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
//Repositories
import userRepository from "../repositories/userRepository.js";

async function create(type, name, email, password) {
  const { rowCount } = await userRepository.findByEmail(email);

  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);

  return await userRepository.create({
    type,
    name,
    email,
    password: hashPassword,
  });
}

async function signIn(email, password) {
  const {
    rowCount,
    rows: [user],
  } = await userRepository.findByEmail(email);
  
  if(!rowCount) throw errors.invalidCredentialsError()

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT);

  return {
    token,
  };
}

export default { create, signIn };
