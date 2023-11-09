import { Response } from "express"
import User, { IUser } from "../auth/models/user"
import UserRepository, { IUserRepository } from "../auth/repositories/user-repository"

const repository: IUserRepository = new UserRepository(User)

export function getUserFrom(res: Response): Promise<IUser> {
    const userId = res.locals.principle._id
    return repository.findById(userId)
}