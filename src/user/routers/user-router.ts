import { NextFunction, Request, Response, Router } from "express";
import User from "../../auth/models/user";
import UserRepository from "../../auth/repositories/user-repository";

const userRouter = Router()

const userRepository = new UserRepository(User)

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.principle._id
        const user = await userRepository.findById(userId)
        user.password = undefined
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

export default userRouter