import { NextFunction, Request, Response, Router } from "express";
import { getUserFrom } from "./user.profile.service";
import UserRepository, { IUserRepository } from "../auth/repositories/user-repository";
import User from "../auth/models/user";

const userProfileRouter = Router()

const repository: IUserRepository = new UserRepository(User)

userProfileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res)
        
        // Not exposing the users password
        user.password = undefined

        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

userProfileRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFrom(res)
        const { name } = req.body
        repository.update(user._id, { name })
    } catch (e) {
        next(e)
    }
})

export default userProfileRouter