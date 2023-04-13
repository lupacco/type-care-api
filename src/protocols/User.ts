import { QueryResult } from "pg"

export type UserEntity = {
    id: number,
    type: string,
    name: string,
    email: string,
    password: string
}

export type UserSignUp = Omit<UserEntity, "id">

export type UserSignIn = Pick<UserEntity, "email" | "password">