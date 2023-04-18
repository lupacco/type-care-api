import { QueryResult } from "pg";
import { prisma } from "../config/database.js";
//Types
import {UserEntity, UserSignUp } from "../protocols/User.js";

async function findByEmail(email: string) {
  const result = await prisma.user.findUnique({
    where:{
      email: email
    }
  })

  return result as QueryResult<UserEntity>
}

async function create(newUser: UserSignUp) {
  const { type, name, email, password } = newUser;
  return await prisma.user.create({
    data: {
      type: type,
      name: name,
      email: email,
      password: password
    },
    select:{
      id: true
    }
  }) as {id: number};
}

async function deleteById(userId: number) {
  await prisma.user.delete({
    where: {
      id: userId
    }
  })
}

async function findById(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  }) as QueryResult<Omit<UserEntity, "password">>;
}

export default { findByEmail, create, deleteById, findById };
