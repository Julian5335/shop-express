import { Response } from "express"
import { ObjectId } from "mongoose"
import { UserDoesntExistError } from "./auth.errors"
import UserRepository, { IUserRepository } from "../users/users.repository"
import { IUser } from "../users/users.model"

const userRepository: IUserRepository<IUser> = new UserRepository()

export async function getUserFromResponse(res: Response) {
    const _id = res.locals.principle as ObjectId
    const user = await userRepository.findById(_id)
    if (!user) throw new UserDoesntExistError()
    return user
}